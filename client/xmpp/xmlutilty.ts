import { Contact } from "@tamagui/lucide-icons-2";
import { client, xml, jid } from "@xmpp/client";
import { ContactsObject } from "components/conversations/contacts/contactsSlice";

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

export function message_stanza(jidwith: string, body: string, type) {
  return xml(
    "message",
    { type: type, to: jidwith },

    xml("body", {}, body)
  );
}