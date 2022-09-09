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

  //.tl-wrapper and .tel-edges are from gatsby-plugin-transition-link
   .tl-edges, .tl-wrapper {
    height: 100%;
    min-width: 280px;
    position: relative;
  }

  // set overflow auto for fist child of gatsby wrappers, otherwise gaps. Could be an issue.
  /* body > div > div > div {
    overflow: auto;
  } */

  // bold / strong text
  strong {
    color: ${Colors.accentOne};
    font-weight: 800;
  }

  // anchor styles
  .page-content-styles a {
    &:hover, &:focus {
      color: ${Colors.accentTwo};
      outline: none;
    }

    font-family: 'Bitter', sans-serif;
    color: ${Colors.accentOne};
    font-style: italic;
    font-weight: 400;
    text-decoration-style: dotted;
    text-underline-offset: 3px;
  }

  /* @@@@@@@@@@@ FONTS @@@@@@@@@@@ */

  h1 { font-family: 'Montserrat', sans-serif; }
  h2, h3 {
    font-family: 'Puritan', sans-serif;
    font-weight: normal;
  }
  p, li {
    font-family: 'Bitter', sans-serif;
    font-weight: 300;
  }

  // for tablet portrait and up
  @media screen and (min-width: 768px) {
    h1 { font-size: 44px; }
    h2 { font-size: 32px; }
  }

  /* @@@@@@@@@@@ Custom Classes @@@@@@@@@@@ */
  .page-container-styles {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .page-content-styles {
    text-align: center;
    width: calc(100% - 80px);
    height: calc(100% - 40px);
    padding: 0 18px;
    max-width: 900px;
    will-change: transform; // potential performance aid (https://medium.com/@kulor/one-small-css-hack-to-improve-scrolling-performance-c5238029e518)

    // scroll bar position for when at max-width (https://stackoverflow.com/a/33231234/15020999)
    @media screen and (min-width: ${Breakpoints.for4TabletLandscapeUp}) { padding: 0 calc(50% - 474px); }

    /* hides default scrollbars */
    scrollbar-width: thin;
    scrollbar-color: transparent transparent !important;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      width: 6px;
      height: 6px;
      background-color: transparent;
    }
    &::-webkit-scrollbar-track {
      box-shadow: none;
      -webkit-box-shadow: none;
      background-color: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background-color: transparent;
      border-radius: 6px;
    }
  }

  // applied when page is actually scrolled
  .on-scroll {
    // cc is scrollbar opacity using hex code alpha (00-ff)
    scrollbar-color: ${Colors.accentOne}cc transparent !important;

    &::-webkit-scrollbar-thumb {
      background-color: ${Colors.accentOne}cc;
    }
  }

  // for iframe animation/transition
  .full-page {
    .project-display-container { height: 100vh; } // switched form 100% to 100vh due to iOS bug.
    & ~ .chevron-link { height: 0px !important; min-height: 0px !important; & > svg { height: 0px !important; } }
  }
  .full-page-helper { height: 0px !important; }
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
