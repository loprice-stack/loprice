import { setConnection } from 'components/conversations/conversationsSlice';
import { LOPRICE_JANUS_ICE_SERVER, LOPRICE_JANUS_URL, LOPRICE_JANUS_URL_S } from 'utils/constants';
import Janode from 'janode';
import { store, useAppDispatch } from 'store/redux/store';
const { Logger } = Janode;
import VideoCallHandle from 'client/janus/videocall-plugin'
import { setRequireLoginDialogOpen } from 'components/account/accountSlice';

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


export async function initializeVideoHandle(sessionContext, videoCallContext, user_token, user_id) {
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
            const videohandle = await session.attach(VideoCallHandle)
            videohandle.register(user_id)
            //@ts-ignore
            sessionContext.session = session;
            videoCallContext.videohandle = videohandle
            videoCallContext.videohandleattached = true
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
