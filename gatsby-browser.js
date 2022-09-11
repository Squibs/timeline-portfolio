/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

var provider = require(`./src/inject-provider`);
exports.wrapPageElement = provider.wrapPageElement;
