import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { Normalize } from 'styled-normalize';

// @_@_@_@_@_@_@ Prevent un-mounting https://www.gatsbyjs.com/docs/how-to/routing/layout-components/#how-to-prevent-layout-components-from-unmounting
// https://scottspence.com/2020/02/06/globally-style-gatsby-styled-components/

const GlobalStyle = createGlobalStyle`
  // 100% height
  // https://github.com/gatsbyjs/gatsby/issues/7310#issuecomment-419977425
  html, body, #___gatsby, #gatsby-focus-wrapper {
    height: 100%;
  }

  // set overflow auto for fist child of gatsby wrappers, otherwise gaps. Could be an issue.
  body > div > div > div {
    overflow: auto;
  }

  /* @@@@@@@@@@@ FONTS @@@@@@@@@@@ */

  h1 { font-family: 'Montserrat', sans-serif; }
  h2 {
    font-family: 'Puritan', sans-serif;
    font-weight: normal;
  }
  p { font-family: 'Bitter', sans-serif; }
`;

const GlobalStyles: React.FC = () => {
  return (
    <>
      <Normalize />
      <GlobalStyle />
    </>
  );
};

export default GlobalStyles;
