import React from 'react';
import { createGlobalStyle } from 'styled-components';
import 'normalize.css';

const GlobalStyle = createGlobalStyle`
  h1 {
    font-family: 'Montserrat', sans-serif;
  }

  h2 {
    font-family: 'Puritan', sans-serif;
    font-weight: normal
  }

  p {
    font-family: 'Bitter', sans-serif;
  }
`;

interface GlobalStylesProps {
  children: React.ReactNode;
}

const GlobalStyles: React.FC<GlobalStylesProps> = ({ children }: GlobalStylesProps) => {
  return (
    <>
      <GlobalStyle />
      {children}
    </>
  );
};

export default GlobalStyles;
