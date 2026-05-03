import { Client, client, xml, jid } from "@xmpp/client";
import middleware from "@xmpp/middleware";


export function getXmppClient(user_name, password, resources) {

  return client({
    service: "wss://loprice.co.tz:5443/ws",
    domain: "loprice.co.tz",
    resource: resources,
    username: user_name,
    password: password,
  });

}

export function getXmppMiddleWhere(xmpp) {
 // const client = new Client();
  const app = middleware({ entity: xmpp });
  return app
}