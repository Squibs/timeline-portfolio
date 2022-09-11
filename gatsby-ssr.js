/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */

// https://github.com/gatsbyjs/gatsby/issues/7747#issuecomment-423770786

var provider = require(`./src/inject-provider`);
exports.wrapPageElement = provider.wrapPageElement;
