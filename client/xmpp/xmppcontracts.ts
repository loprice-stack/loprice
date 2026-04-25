import { setContactIsLoading, updateConctactList } from "components/conversations/contacts/contactsSlice"
import { store } from "store/redux/store"
import { getContacts, parseContactGroupItems } from "./xmlutilty"

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
