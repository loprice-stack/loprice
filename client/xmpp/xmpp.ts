import { client, xml,jid } from "@xmpp/client";
import { generateResource } from "utils/utility";


export function getXmppClient(user_name, password, resources) {

  return client({
    service: "wss://loprice.co.tz:5443/ws",
    domain: "loprice.co.tz",
    resource: resources,
    username: user_name,
    password: password,
  });

}

