import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { Normalize } from 'styled-normalize';

// @_@_@_@_@_@_@ Prevent un-mounting https://www.gatsbyjs.com/docs/how-to/routing/layout-components/#how-to-prevent-layout-components-from-unmounting
// https://scottspence.com/2020/02/06/globally-style-gatsby-styled-components/

const GlobalStyle = createGlobalStyle<{ bgColor: string }>`
  h1 {
    font-family: 'Montserrat', sans-serif;
  }

  h2 {
    font-family: 'Puritan', sans-serif;
    font-weight: normal;
  }

  p {
    font-family: 'Bitter', sans-serif;
  }

  body {
    background-color: ${(props) => props.bgColor};
  }
`;

interface GlobalStylesProps {
  backgroundColor: string;
  children: React.ReactNode;
}

const GlobalStyles: React.FC<GlobalStylesProps> = ({
  children,
  backgroundColor,
}: GlobalStylesProps) => {
  return (
    <>
      <Normalize />
      <GlobalStyle bgColor={backgroundColor} />
      {children}
    </>
  );
};

export default GlobalStyles;