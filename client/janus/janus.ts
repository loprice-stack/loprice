import { LOPRICE_JANUS_ICE_SERVER, LOPRICE_JANUS_URL_S } from 'client/constants';
import Janode from 'janode';
const { Logger } = Janode;

export async function janus() {
    const connection = await Janode.connect({
        is_admin: false,
        address: {
            url: LOPRICE_JANUS_URL_S,
            iceServers: LOPRICE_JANUS_ICE_SERVER
        }
    });

    return await connection.create()
}



