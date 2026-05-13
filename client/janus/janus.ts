import { setConnection } from 'components/conversations/conversationsSlice';
import { LOPRICE_JANUS_ICE_SERVER, LOPRICE_JANUS_URL, LOPRICE_JANUS_URL_S } from 'utils/constants';
import Janode from 'janode';
import { store, useAppDispatch } from 'store/redux/store';
const { Logger } = Janode;
import VideoCallHandle from 'client/janus/videocall-plugin'
import { setRequireLoginDialogOpen } from 'components/account/accountSlice';
import { getXmppClient } from 'client/xmpp/xmpp';
import { xml } from "@xmpp/client";
import { generateResource, getJidLocal, jidAsStringOf } from 'utils/utility';
import { get_archieve_message, isIqStanza, isMessageStanza, isPresenceStanza, parseArchievedMessages, parseMessages } from 'client/xmpp/xmlutilty';
import { pushMessage } from 'components/conversations/messages/messagesSlice';

export async function janussession(sessionContext) {
    //const dispatch = useAppDispatch();
    const connection = await Janode.connect({
        is_admin: false,
        address: {
            url: LOPRICE_JANUS_URL_S,
            iceServers: LOPRICE_JANUS_ICE_SERVER
        }
    });



    connection.once(Janode.EVENT.CONNECTION_CLOSED, () => {
        sessionContext.connection = null
        sessionContext.session = null
        Logger.info(`${'Janus'} connection  closed ---------------------------`);
    });

    connection.once(Janode.EVENT.CONNECTION_ERROR, error => {
        sessionContext.connection = null
        sessionContext.session = null
        Logger.error(`${'Janus'} connection error: ${error.message} ----------------------------`);

    });

    sessionContext.connection = connection
    return await connection.create()
}


export async function initializeLopriceServices(sessionContext, videoCallContext, messageContext, user_token, user_id, password) {
    if (user_token) {
        initializeVideoCallHandleWithNewSession(sessionContext, videoCallContext, user_id);
        initializeXmpp(messageContext, user_id, password);
    } else {

        store.dispatch(setRequireLoginDialogOpen(false))
        stopLopriceServices(sessionContext, videoCallContext, messageContext)
    }
}

export async function stopLopriceServices(sessionContext, videoCallContext, messageContext) {

    stopVideoCallHandleWithItsSession(sessionContext, videoCallContext);
    stopXmpp(messageContext)
}

export async function initializeVideoCallHandleWithNewSession(sessionContext, videoCallContext, user_id) {
    //janus session and handle goes hand in hand. better to deal with them together
    if ((sessionContext.session !== null) && (videoCallContext.videohandle !== null)) {
        if (videoCallContext.videohandleattached) {

            //@ts-ignore
            videoCallContext.videohandle.register(user_id)
        } else {

            //@ts-ignore
            const videohandle = await sessionContext.session.attach(VideoCallHandle)
            // generic handle events
            videohandle.once(VideoCallHandle.EVENT.VIDEOCALL_DETACHED, evtdata => {
                videoCallContext.videohandle = null
                videoCallContext.videohandleattached = false

                //then detroy its associated session
                if (sessionContext.session !== null) {
                    sessionContext.session.destroy()
                }
                Logger.info(`${'VideoCallHandle'} ${videohandle.name} detached --------------`);
            });
            videohandle.register(user_id)
            videoCallContext.videohandle = videohandle
            videoCallContext.videohandleattached = true
        }
    } else {

        const session = await janussession(sessionContext);
        session.once(Janode.EVENT.SESSION_DESTROYED, () => {
            sessionContext.session = null;
            //then close the connection all together
            if (sessionContext.connection !== null) {
                sessionContext.connection.close()
            }
            Logger.info(`${'Janus'} session ${session.id} destroyed --------------------`);
        });

        const videohandle = await session.attach(VideoCallHandle)
        // generic handle events
        videohandle.once(VideoCallHandle.EVENT.VIDEOCALL_DETACHED, evtdata => {
            videoCallContext.videohandle = null
            videoCallContext.videohandleattached = false

            //then detroy its associated session
            if (sessionContext.session !== null) {
                sessionContext.session.destroy()
            }
            Logger.info(`${'VideoCallHandle'} ${videohandle.name} detached --------------`);
        });

        videohandle.register(user_id)
        //@ts-ignore
        sessionContext.session = session;
        videoCallContext.videohandle = videohandle
        videoCallContext.videohandleattached = true

    }
}


export async function stopVideoCallHandleWithItsSession(sessionContext, videoCallContext) {
    //janus session and handle goes hand in hand. better to deal with them together


    try {

        if (videoCallContext.videohandle !== null) {
            await videoCallContext.videohandle.detach()
        }

    } catch (e) {
        console.log(e)
        console.log("------------stopVideoCallHandleWithItsSession---error---------------")
    }

}


export async function initializeXmpp(messageContext, user_id, password) {


    if (messageContext.xmpp == null) {

        let res = generateResource(3)
        const xmpp = getXmppClient(user_id, password, res)

        xmpp.on("status", (status) => {
            if (status == 'open') {
                messageContext.xmppopen = true
            } else if (status == 'online') {
                // Makes itself available
                xmpp.send(xml("presence"));
            } else {
                messageContext.xmppopen = false
            }

            console.log(status);
            console.log("----------------xmpp---status---------------------");

        });

        xmpp.on("stanza", onStanza);
        async function onStanza(stanza) {

            if (isMessageStanza(stanza)) {
                const ismessagearchived = await get_archieve_message(stanza)
                if (ismessagearchived !== undefined) {
                    parseArchievedMessages(stanza, user_id).then((msg) => {

                        if (msg !== undefined) {
                            store.dispatch(pushMessage(msg))
                        }
                        console.log(msg);
                        console.log("--------------archived---message--parsed------------------------");
                    })
                } else {

                    parseMessages(stanza, user_id).then((msg) => {

                        if (msg !== undefined) {
                            store.dispatch(pushMessage(msg))
                        }
                        console.log(msg);
                        console.log("-----------------message--parsed------------------------");
                    })
                }

                console.log(stanza);
                console.log("-----------------isMessageStanza------------------------");
            } else if (isIqStanza(stanza)) {

                console.log(stanza.toString());
                console.log("-----------------isIqStanza------------------------");
            } else if (isPresenceStanza(stanza)) {

                console.log(stanza.toString());
                console.log("-----------------isPresenceStanza-----------------------");
            } else {

                console.log(stanza.toString());
                console.log("-----------------isUnknownStanza-----------------------");
            }
        }

        xmpp.on("error", (err) => {
            console.error(err);
            //xmpp.stop()
            console.log("----------------xmpp---error---------------------");
        });


        console.log(user_id);
        console.log(password);
        console.log("-----------------user_id------password-----------------");

        await xmpp.start()
        messageContext.xmpp = xmpp


    }
}



export async function stopXmpp(messageContext) {
    try {

        if (messageContext.xmpp !== null) {
            messageContext.xmpp.stop()
            messageContext.xmpp = null
            console.log("----------------------xmpp---stop------------------")
        }


    } catch (e) {
        messageContext.xmpp = null
        console.log(e)
        console.log("----------------------xmpp---stop---error---------------")
    }


}



export function isLoggedIn(user_token) {
    if (user_token) {
        return true
    } else {

        store.dispatch(setRequireLoginDialogOpen(true))
        return false
    }
}


export function isXmppNotNull(messageContext, user_id, user_token, password) {

    if (isLoggedIn(user_token)) {

        if (messageContext.xmpp !== null) {

            
            console.log("---------------------- messageContext.xmpp---is-xmpp-not--null---------------")
            return true
        } else {
            initializeXmpp(messageContext, user_id, password)
            console.log("---------initializing------------- messageContext.xmpp---is-xmpp-not--null---------------")
            return false
        }
    }
}

export function isVideoCallHandlePluged(sessionContext, videoCallContext, user_id, user_token) {
    if (isLoggedIn(user_token)) {
        if (sessionContext.session !== null )  {
           
            console.log(typeof sessionContext.session)
            console.log(typeof videoCallContext.videohandle)
            console.log("-------isvideocallhandlepluged-----ee----------true-------------")
           
            return true
        } else {
            //start new alltogether
            initializeVideoCallHandleWithNewSession(sessionContext, videoCallContext, user_id)
             console.log("------isvideocallhandlepluged----------------false-----------")
            return false

        }
    }

}

export function isSessionDestroyed(sessionContext, videoCallContext, user_id, user_token) {
    if (isLoggedIn(user_token)) {
    }
}