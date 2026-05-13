# Loprice

Loprice is intended to be live streaming platform. We are not bringing something new but in some way if you can find our platform useful, you are wellcome. Our code does not follow any formal standard and we do what works. In case you need any clarification just reach out to us and any contribution will be appreciated.  

Generally loprice uses [Webrtc](https://webrtc.org/) and [Xmpp](https://xmpp.org/) technologies together with REST Api technologies in its core to implements most of its components. There is so much resources in the open source community for these technology but we picked what we think is reliable and can accomplish our goals.  
For Wbrtc we uses [Janus Webrtc Server](https://github.com/meetecho/janus-gateway/tree/master#janus-webrtc-server) and [Janode adapter](https://github.com/meetecho/janode#about-janode) to access the server. We used Janode adapter to access the server direct in contrast to its use case. The janode was intended to build a proxy for Janus server, but in our case we decide to build the proxy separately using Api.  

For Xmpp we uses [Ejabberd Messaging Server](https://github.com/processone/ejabberd) and [xmpp.js](https://github.com/xmppjs/xmpp.js) library to access the server.  

For Api we uses [FastApi](https://fastapi.tiangolo.com/) for proxy and other platform operational components

Also for ui/ux is mostly [tamagui](https://tamagui.dev/) components and [React Native Gifted Chat](https://github.com/faridsafi/react-native-gifted-chat#react-native-gifted-chat)

The unification of all these gives us the handfull of functionality.

### Features
+ Listings
+ Streaming
+ Video call
+ Messaging

### Installation requirements
1. Install and configure Janus Webrtc server
2. Instal and configure Ejabberd server
3. Install Fast api and implements minimal main.py for login authentication with sqlite database for dummy login or disable this feature in the app
4. Download this repo souuce code to your favourite code editor and
5. bun install



