import React from 'react';
import styled, { ThemeProvider, DefaultTheme } from 'styled-components';
import { Breakpoints, Colors } from '../shared';

const BorderContainer = styled.div`
  width: calc(100% - 40px);
  height: calc(100% - 40px);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 10px solid #bda453;
  border-radius: 5px;
  filter: drop-shadow(0 4px 4px black);
  pointer-events: none;
  min-width: 230px;
  z-index: 5;
`;

const mediaQuery = (size: keyof typeof Breakpoints) => {
  if (size === 'for0SmallPhonesOnly') {
    return (cssStyles: TemplateStringsArray) =>
      `@media screen and (max-width: ${Breakpoints[size]}) { ${cssStyles} }`;
  }

  if (size === 'for1PhoneOnly') {
    return (cssStyles: TemplateStringsArray) =>
      `@media screen and (max-width: ${Breakpoints[size]}) { ${cssStyles} }`;
  }

  return (cssStyles: TemplateStringsArray) =>
    `@media screen and (min-width: ${Breakpoints[size]}) { ${cssStyles} }`;
};

const theme: DefaultTheme = {
  colors: {
    primaryLight: Colors.primaryLight,
    primaryNeutral: Colors.primaryNeutral,
    primaryDark: Colors.primaryDark,
    accentOne: Colors.accentOne,
    accentTwo: Colors.accentTwo,
    whiteTint: Colors.whiteTint,
  },
  breakpoints: {
    for0SmallPhonesOnly: () => mediaQuery('for0SmallPhonesOnly'),
    for1PhoneOnly: () => mediaQuery('for1PhoneOnly'),
    for2SlightlyBiggerPhoneUp: () => mediaQuery('for2SlightlyBiggerPhoneUp'),
    for3TabletPortraitUp: () => mediaQuery('for3TabletPortraitUp'),
    for4TabletLandscapeUp: () => mediaQuery('for4TabletLandscapeUp'),
    for5DesktopUp: () => mediaQuery('for5DesktopUp'),
    for6BigDesktopUp: () => mediaQuery('for6BigDesktopUp'),
  },
};

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
  return (
    <>
      <BorderContainer />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </>
  );
};

export default Layout;
