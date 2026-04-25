import { setContactIsLoading, updateConctactList } from "components/conversations/contacts/contactsSlice"
import { store } from "store/redux/store"
import { getContacts, message_stanza, parseContactGroupItems } from "./xmlutilty"
import { XMPP_MESSAGE_TYPE_CHAT } from "utils/constants"



/////////////////////////////////////contacts///////////////////////////////////////////////

export function loadContacts(grp, xmpp, user_id) {
    store.dispatch(setContactIsLoading(true))
    getContacts(xmpp, user_id)
        .then((iq) => {
            parseContactGroupItems(iq, grp).then((items) => {
                store.dispatch(updateConctactList(items))
                store.dispatch(setContactIsLoading(false))
            })
        }).catch((error) => {
            store.dispatch(setContactIsLoading(false))
            console.log(error)
        })
}


/////////////////////////////////////message///////////////////////////////////////////////


export async function sendChatMessage(xmpp: any, jidwith: string, body: string) {
return await xmpp.send(message_stanza(jidwith, body, XMPP_MESSAGE_TYPE_CHAT))
}