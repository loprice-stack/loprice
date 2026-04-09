import { setConnection } from 'app/conversations/conversationsSlice';
import { LOPRICE_JANUS_ICE_SERVER, LOPRICE_JANUS_URL_S } from 'client/constants';
import Janode from 'janode';
import { useAppDispatch } from 'store/redux/store';
const { Logger } = Janode;

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



