// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const config = getDefaultConfig(__dirname);
const path = require('path')
config.resolver.unstable_enablePackageExports = false;
config.resolver.extraNodeModules = {
      "node:dns": path.resolve(__dirname, 'polyfills/empty.js'),//hack for node: dns
    }
module.exports = config;



