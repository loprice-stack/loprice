import { setContactIsLoading, updateConctactList } from "components/conversations/contacts/contactsSlice"
import { store } from "store/redux/store"
import { getContacts, getMessageConversation, getMoreMessageConversation, message_iq_stanza, parseContactGroupItems } from "./xmlutilty"
import { XMPP_MESSAGE_TYPE_CHAT } from "utils/constants"
import { isXmppNotNull } from "client/janus/janus"



/////////////////////////////////////contacts///////////////////////////////////////////////

export function loadContacts(messageContext, user_id, user_token, password, grp) {
    if (isXmppNotNull(messageContext, user_id, user_token, password)) {
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


export async function sendChatMessage(messageContext: any, user_id, user_token, password, jidwith: string, body: string) {
    if (isXmppNotNull(messageContext, user_id, user_token, password)) {
        return await messageContext.xmpp.send(message_iq_stanza(jidwith, body, XMPP_MESSAGE_TYPE_CHAT))
    }
}
export async function getCoversation(messageContext: any, user_id, user_token, password, jidwith: string, max: number) {
    if (isXmppNotNull(messageContext, user_id, user_token, password)) {
        return await getMessageConversation(messageContext.xmpp, user_id, jidwith, max)
    }
}

export async function getMoreCoversation(messageContext: any, user_id, user_token, password, jidwith: string, max: number, aftreid: string) {
    if (isXmppNotNull(messageContext, user_id, user_token, password)) {
        return await getMoreMessageConversation(messageContext.xmpp, user_id, jidwith, max, aftreid)
    }
}
