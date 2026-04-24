//HACK TO DISABLE MODDULE NOT FOUND (node: dns)

//make directory   polyfills/empty.js

//and put
//module.exports = {}

module.exports = {}

//then update metro.config


//Update the file metro.config.js like this:
//const path = require('path')

//module.exports = {
//  resolver: {
//    extraNodeModules: {
//      "node:dns": path.resolve(__dirname, 'polyfills/empty.js'),
//    }
//  }
//}


//and


 // eslint-disable-next-line n/no-unsupported-features/node-builtins
  //userAgent ??= xml("user-agent", { id: globalThis.crypto.randomUUID() }); ///////DISABLE THIS in @xmpp/client/index.js
  //or work arround to resolve if you real need it