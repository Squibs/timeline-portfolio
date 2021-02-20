import React from 'react';
import { ThemeProvider, DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  colors: {
    primaryLight: '#CDD7D9',
    primaryNeutral: '#2B549C',
    primaryDark: '#2F343C',
    accentOne: '#BDA453',
    accentTwo: '#B3192B',
    whiteTint: '#FAFAFA',
  },
};

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
  return (
    <>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </>
  );
};

export default Layout;
