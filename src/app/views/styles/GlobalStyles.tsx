import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { Normalize } from 'styled-normalize';
import { Breakpoints, Colors } from '../shared';

// @_@_@_@_@_@_@ Prevent un-mounting https://www.gatsbyjs.com/docs/how-to/routing/layout-components/#how-to-prevent-layout-components-from-unmounting
// https://scottspence.com/2020/02/06/globally-style-gatsby-styled-components/

const GlobalStyle = createGlobalStyle`
  // 100% height
  // https://github.com/gatsbyjs/gatsby/issues/7310#issuecomment-419977425
  html, body, #___gatsby, #gatsby-focus-wrapper {
    height: 100%;
    min-width: 280px;
    position: relative;
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

  // for tablet portrait and up
  @media screen and (min-width: 768px) {
    h1 { font-size: 72px; }
    h2 { font-size: 48px; }
  }

  /* @@@@@@@@@@@ Custom Classes @@@@@@@@@@@ */
  .page-container-styles {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${Colors.primaryDark};
    color: ${Colors.whiteTint};
  }

  .page-content-styles {
    text-align: center;
    width: calc(100% - 80px);
    height: calc(100% - 40px);
    overflow-y: auto;
    padding: 0 18px;
    max-width: 900px;
    will-change: transform; // potential performance aid (https://medium.com/@kulor/one-small-css-hack-to-improve-scrolling-performance-c5238029e518)

    // scroll bar position for when at max-width (https://stackoverflow.com/a/33231234/15020999)
    @media screen and (min-width: ${Breakpoints.for4TabletLandscapeUp}) { padding: 0 calc(50% - 472px); }

    /* hides default scrollbars */
    scrollbar-width: thin;
    scrollbar-color: transparent transparent;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      width: 6px;
      background-color: transparent;
    }
    &::-webkit-scrollbar-track {
      box-shadow: none;
      -webkit-box-shadow: none;
      background-color: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background-color: transparent;
    }
  }

  .on-scroll {
    scrollbar-width: thin;
    -ms-overflow-styled: none;
    // cc is scrollbar opacity using hex code alpha (00-ff)
    scrollbar-color: ${Colors.accentOne}cc
      ${Colors.primaryDark};
    &::-webkit-scrollbar {
      width: 6px !important;
      background-color: transparent;
    }
    &::-webkit-scrollbar-track {
      box-shadow: none !important;
      -webkit-box-shadow: none !important;
      background: transparent !important;
    }
    &::-webkit-scrollbar-thumb {
      background-color: ${Colors.accentOne}cc;
      border-radius: 6px;
    }
  }
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
