/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */

var provider = require(`./src/inject-provider`);
exports.wrapPageElement = provider.wrapPageElement;
