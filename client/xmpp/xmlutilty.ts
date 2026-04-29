import { Contact } from "@tamagui/lucide-icons-2";
import { client, xml, jid } from "@xmpp/client";
import { ContactsObject } from "components/conversations/contacts/contactsSlice";
import { XMPP_MESSAGE_TYPE_CHAT } from "utils/constants";

/////////////////////////////////////general////////////////////////////////////////////////

export async function getxmppitems(iqresults) {
    const query = iqresults.getChild("query")
    if (query !== null) {
        const items = query.getChildren("item")
        return items
    } else {
        return []
    }
}


export function isMessageStanza(stanza) {
    const message = stanza.attrs.name
    if (stanza.is("message")) {

        return true
    } else {
        return false
    }
}

export function isIqStanza(stanza) {
    const iq = stanza.attrs.name
    if (stanza.is("iq")) {

        return true
    } else {
        return false
    }
}

export function isPresenceStanza(stanza) {
    const presence = stanza.attrs.name
    if (stanza.is("presence")) {

        return true
    } else {
        return false
    }
}





////////////////////////////////////contacts/////////////////////////////////////////////////


export async function parseContactItems(iq) {
    const items = await getxmppitems(iq)
    const itemss = []
    items.map((item) => {
        const jid = item.attrs.jid
        const name = item.attrs.name
        const subscription = item.attrs.subscription
        const group = item.getChild("group")
        //@ts-ignore
        itemss.push({
            "jid": jid,
            "name": name,
            "subscription": subscription,
            "group": group ? group.text() : ""

        })
    })
    return itemss
}

export async function parseContactGroups(iq) {
    const items = await getxmppitems(iq)
    let previous = ""
    const groupss = []
    items.map(async (item) => {
        const jid = item.attrs.jid
        const name = item.attrs.name
        const subscription = item.attrs.subscription
        const group = item.getChild("group")
        if (group !== undefined) {
            if (group.text() !== "My contacts") {
                //@ts-ignore
                if (groupss.includes({ "name": group.text() })) {

                } else {
                    //@ts-ignore
                    groupss.push({ "name": group.text() })
                }

            }

        }
    })
    return groupss
}

export async function parseContactGroupItems(iq, groupv) {
    const items = await getxmppitems(iq)
    const itemss = []
    items.map((item) => {
        const jid = item.attrs.jid
        const name = item.attrs.name
        const subscription = item.attrs.subscription
        const group = item.getChild("group")
        if (group !== undefined) {
            const groupt = group.text()
            if (groupv == groupt) {
                //@ts-ignore
                itemss.push({
                    "jid": jid,
                    "name": name,
                    "subscription": subscription,
                    "group": group ? group.text() : ""
                })
            }
        }
    })
    return itemss
}

export async function createContacts(xmpp, jid, jidcontact, name, group) {

    const { iqCaller } = xmpp;
    const iq = await iqCaller.request(
        xml("iq", { from: jid, type: "set" },
            xml("query", { xmlns: 'jabber:iq:roster' },
                xml("item", {
                    jid: jidcontact,
                    name: name
                },
                    xml("group", {},
                        group)
                )
            )
        )
    )
    return iq
}

export async function getContacts(xmpp, jid) {
    const { iqCaller } = xmpp;
    const iq = await iqCaller.request(
        xml("iq", {
            from: jid,
            "type": 'get'
        },
            xml("query", { "xmlns": 'jabber:iq:roster' })
        )
    )
    return iq
}

export async function deleteContacts(xmpp, jid, jidcontact) {
    const { iqCaller } = xmpp;
    const iq = await iqCaller.request(
        xml("iq", { from: jid, type: "set" },
            xml("query", { xmlns: 'jabber:iq:roster' },
                xml("item", {
                    jid: jidcontact,
                    subscription: "remove"
                }
                )
            )
        )
    )
    return iq
}



/////////////////////////////////////message///////////////////////////////////////////////

export function message_iq_stanza(jidwith: string, body: string, type) {
    return xml(
        "message",
        { type: type, to: jidwith },

        xml("body", {}, body)
    );
}


export async function get_archieve_message(iqresults) {
    const result = iqresults.getChild("result")
    if (result !== undefined) {
        const forwarded = await result.getChild("forwarded")
        if (forwarded !== undefined) {
            return forwarded
        } else {
            return undefined
        }

    } else {
        return undefined
    }
}

export async function parseFin(fin) {

    let first = ""
    let last = ""
    let count = 0

    const _set = await fin.getChild("set")

    if (_set !== undefined) {
        const _count = await _set.getChild("count")
        count = _count !== undefined ? _count.text() : 0
        const _first = await _set.getChild("first")
        first = _first !== undefined ? _first.text() : undefined
        const _last = await _set.getChild("last")
        last = _last !== undefined ? _last.text() : undefined

        return {
            "count": count,
            "first": first,
            "last": last
        }
    }
}


export async function parseMessages(stanza, jid) {
    let to = ""
    let from = ""
    let type = ""
    let messageid = ""
    let messagebody = ""

    //message child
    if (isMessageStanza(stanza)) {
        const _to = stanza.attrs.to
        to = _to
        const _from = stanza.attrs.from
        from = _from
        const _type = stanza.attrs.type
        type = _type

        const archived = await stanza.getChild("archived")
        if (archived !== undefined) {
            const by = archived.attrs.by
            const id_ = archived.attrs.id
            messageid = id_
        }

        const body = await stanza.getChild("body")
        if (body !== undefined) {
            const _body = body.getText()
            messagebody = _body

        }

        if (type == XMPP_MESSAGE_TYPE_CHAT) {
            //create message object
            const msg = {
                _id: messageid,
                text: messagebody,
                createdAt: Date.now(),
                user: {
                    _id: from.includes(jid) ?  1 : 2,
                    name: from,
                    avatar: 'http://picsum.photos/200/300',
                },
            }
            return msg
        } else {
            return undefined
        }
    } else {
        return undefined
    }
}

export async function parseArchievedMessages(iqresults, jid) {
    let to = ""
    let from = ""
    let type = ""
    let delayfrom = ""
    let delaystamp = ""
    let messageid = ""
    let messagebody = ""
    const forwarded = await get_archieve_message(iqresults)

    if (forwarded !== undefined) {
        const message = await forwarded.getChild("message")
        const delay = await forwarded.getChild("delay")

        //message child
        if (message !== undefined) {
            const _to = message.attrs.to
            to = _to
            const _from = message.attrs.from
            from = _from
            const _type = message.attrs.type
            type = _type

            const archived = await message.getChild("archived")
            if (archived !== undefined) {
                const by = archived.attrs.by
                const id_ = archived.attrs.id
                messageid = id_
            }

            const body = await message.getChild("body")
            if (body !== undefined) {
                const _body = body.getText()
                messagebody = _body
            }
        }

        //delay child
        if (delay !== undefined) {
            const _delayfrom = delay.attrs.from
            delayfrom = _delayfrom
            const _delaystamp = delay.attrs.stamp
            delaystamp = _delaystamp
        }

        if (type == XMPP_MESSAGE_TYPE_CHAT) {
            //create message object
            const msg = {
                _id: messageid,
                text: messagebody,
                createdAt: delaystamp,
                user: {
                    _id: from.includes(jid) ? 1 : 2,
                    name: from,
                    avatar: 'http://picsum.photos/200/300',
                },

            }
            return msg
        } else {
            return undefined
        }
    } else {
        return undefined
    }
}

export async function getMessageConversation(xmpp: any, jid: string, jidwith: string, max: number) {
    const { iqCaller } = xmpp;

    const result = await iqCaller.request(
        xml(
            "iq",
            { type: "set", from: jid },
            xml(
                "query",
                { xmlns: "urn:xmpp:mam:2" },
                xml(
                    "x",
                    { xmlns: "jabber:x:data", type: "submit" },
                    xml(
                        "field",
                        { var: "FORM_TYPE", type: "hidden" },
                        xml("value", {}, "urn:xmpp:mam:2")
                    ),

                    xml("field", { var: "with" }, xml("value", {}, jidwith))
                ),

                xml(
                    "set",
                    { xmlns: "http://jabber.org/protocol/rsm" },

                    xml("max", {}, max)
                ),
                //xml("flip-page")
            )
        )
    );
    return result.getChild("fin", "urn:xmpp:mam:2");
}



export async function getMoreMessageConversation(xmpp: any, jid: string, jidwith: string, max: number, afterid: string) {

    const { iqCaller } = xmpp;
    const result = await iqCaller.request(

        xml(
            "iq",
            { type: "set", from: jid },
            xml(
                "query",
                { xmlns: "urn:xmpp:mam:2" },
                xml(
                    "x",
                    { xmlns: "jabber:x:data", type: "submit" },
                    xml(
                        "field",
                        { var: "FORM_TYPE", type: "hidden" },
                        xml("value", {}, "urn:xmpp:mam:2")
                    ),

                    xml("field", { var: "with" }, xml("value", {}, jidwith))
                ),

                xml(
                    "set",
                    { xmlns: "http://jabber.org/protocol/rsm" },

                    xml("max", {}, max),
                    xml("after", {}, afterid)
                ),

                //xml("flip-page")
            )
        )
    );

    return result.getChild("fin", "urn:xmpp:mam:2");
}




export async function getPref(xmpp) {
    const { iqCaller } = xmpp;
    const iq = await iqCaller.request(
        xml("iq", { type: "get" },
            xml("prefs", { xmlns: 'urn:xmpp:mam:2' })
        )
    )
    return iq
}