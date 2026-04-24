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

export async function janussession() {
    //const dispatch = useAppDispatch();
    const connection = await Janode.connect({
        is_admin: false,
        address: {
            url: LOPRICE_JANUS_URL,
            iceServers: LOPRICE_JANUS_ICE_SERVER
        }
    });

    //dispatch(setConnection(connection))

    return await connection.create()
}


export async function initializeVideoHandle(sessionContext, videoCallContext, messageContext, user_token, user_id, password) {
    if (user_token) {
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

            //const id = jidAsStringOf(user_id)
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
                console.log(stanza.toString());
            }

            xmpp.on("error", (err) => {
                console.error(err);
                console.log("----------------xmpp---error---------------------");
            });

            if (messageContext.xmpp == null) {
                await xmpp.start()
                messageContext.xmpp = xmpp
            } else {

                if (!messageContext.xmppopen) {
                    await xmpp.stop()
                    await xmpp.start()
                    messageContext.xmpp = xmpp
                }

            }


        }
    } else {

        store.dispatch(setRequireLoginDialogOpen(false))
        sessionContext.session = null
        videoCallContext.videohandle = null
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
