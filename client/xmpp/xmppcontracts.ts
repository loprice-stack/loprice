import { setContactIsLoading, updateConctactList } from "components/conversations/contacts/contactsSlice"
import { store } from "store/redux/store"
import { getContacts, getMessageConversation, getMoreMessageConversation, message_iq_stanza, parseContactGroupItems } from "./xmlutilty"
import { XMPP_MESSAGE_TYPE_CHAT } from "utils/constants"
import { isXmppNotNull } from "client/janus/janus"



/////////////////////////////////////contacts///////////////////////////////////////////////

export function loadContacts(grp,messageContext , user_id, password) {
    if (isXmppNotNull(messageContext.xmpp, user_id, password)) {
    store.dispatch(setContactIsLoading(true))
    getContacts(messageContext.xmpp, user_id)
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
}


/////////////////////////////////////message///////////////////////////////////////////////


export async function sendChatMessage(xmpp: any, jidwith: string, body: string) {
    return await xmpp.send(message_iq_stanza(jidwith, body, XMPP_MESSAGE_TYPE_CHAT))
}
export async function getCoversation(xmpp: any, jid: string, jidwith: string, max: number) {
    return await getMessageConversation(xmpp, jid, jidwith, max)
}

export async function getMoreCoversation(xmpp: any, jid: string, jidwith: string, max: number, aftreid: string) {
    return await getMoreMessageConversation(xmpp, jid, jidwith, max, aftreid)
}
