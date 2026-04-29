import { setConnection } from 'components/conversations/conversationsSlice';
import { LOPRICE_JANUS_ICE_SERVER, LOPRICE_JANUS_URL, LOPRICE_JANUS_URL_S } from 'utils/constants';
import Janode from 'janode';
import { store, useAppDispatch } from 'store/redux/store';
const { Logger } = Janode;
import VideoCallHandle from 'client/janus/videocall-plugin'
import { setRequireLoginDialogOpen } from 'components/account/accountSlice';
import { getXmppClient } from 'client/xmpp/xmpp';
import { xml } from "@xmpp/client";
import { generateResource, jidAsStringOf } from 'utils/utility';
import { get_archieve_message, isIqStanza, isMessageStanza, isPresenceStanza, parseArchievedMessages, parseMessages } from 'client/xmpp/xmlutilty';
import { pushMessage } from 'components/conversations/messages/messagesSlice';

export async function janussession() {
    //const dispatch = useAppDispatch();
    const connection = await Janode.connect({
        is_admin: false,
        address: {
            url: LOPRICE_JANUS_URL_S,
            iceServers: LOPRICE_JANUS_ICE_SERVER
        }
    });

    //dispatch(setConnection(connection))

    return await connection.create()
}


export async function initializeLopriceServices(sessionContext, videoCallContext, messageContext, user_token, user_id, password) {
    if (user_token) {
        initializeVideoCallHandleWithNewSession(sessionContext, videoCallContext, user_id);
        initializeXmpp(messageContext, user_id, password);
    } else {

        store.dispatch(setRequireLoginDialogOpen(false))
        sessionContext.session = null
        videoCallContext.videohandle = null
    }
}


export async function initializeVideoCallHandleWithNewSession(sessionContext, videoCallContext, user_id) {
    //janus session and handle goes hand in hand. better to deal with them together
    if ((sessionContext.session !== null) || (videoCallContext.videohandle !== null)) {
        if (videoCallContext.videohandleattached) {

            //@ts-ignore
            videoCallContext.videohandle.register(user_id)
        } else {

            //@ts-ignore
            const videohandle = await sessionContext.session.attach(VideoCallHandle)
            videohandle.register(user_id)
            videoCallContext.videohandle = videohandle
            videoCallContext.videohandleattached = true

        }

    } else {

        const session = await janussession();
        session.once(Janode.EVENT.SESSION_DESTROYED, () => {
            sessionContext.session = null;
            videoCallContext.videohandle = null
            videoCallContext.videohandleattached = false
            Logger.info(`${'Janus'} session ${session.id} destroyed`);
        });

        const videohandle = await session.attach(VideoCallHandle)
        // generic handle events
        videohandle.once(Janode.EVENT.HANDLE_DETACHED, () => {
            videoCallContext.videohandle = null
            videoCallContext.videohandleattached = false
            Logger.info(`${'Handle'} ${videohandle.name} manager handle detached event`);
        });

        videohandle.register(user_id)
        //@ts-ignore
        sessionContext.session = session;
        videoCallContext.videohandle = videohandle
        videoCallContext.videohandleattached = true

    }
}



export async function initializeXmpp(messageContext, user_id, password) {

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

    await xmpp.start()
    messageContext.xmpp = xmpp
}



export function isLoggedIn(user_token) {
    if (user_token) {
        return true
    } else {

        store.dispatch(setRequireLoginDialogOpen(true))
        return false
    }
}


export  function isXmppNotNull(messageContext, user_id, password) {

    if (messageContext.xmpp !== null) {
        return true
    } else {
        initializeXmpp(messageContext, user_id, password)
        return false

    }
}

export function isVideoCallHandlePluged(sessionContext, videoCallContext, user_id) {

    if ((sessionContext.session !== null) || (videoCallContext.videohandle !== null)) {
        return true
    } else {
        initializeVideoCallHandleWithNewSession(sessionContext, videoCallContext, user_id)
        return false

    }

}

export function isSessionDestroyed() {

}