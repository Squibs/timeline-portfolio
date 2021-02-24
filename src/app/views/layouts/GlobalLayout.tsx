import React from 'react';
import styled, { ThemeProvider, DefaultTheme } from 'styled-components';

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

enum Size {
  for0SmallPhonesOnly = '350px',
  for1PhoneOnly = '599px',
  for2SlightlyBiggerPhoneUp = '600px',
  for3TabletPortraitUp = '768px',
  for4TabletLandscapeUp = '900px',
  for5DesktopUp = '1200px',
  for6BigDesktopUp = '1800px',
}

const mediaQuery = (size: keyof typeof Size) => {
  if (size === 'for0SmallPhonesOnly') {
    return (cssStyles: TemplateStringsArray) =>
      `@media screen and (max-width: ${Size[size]}) { ${cssStyles} }`;
  }

  if (size === 'for1PhoneOnly') {
    return (cssStyles: TemplateStringsArray) =>
      `@media screen and (max-width: ${Size[size]}) { ${cssStyles} }`;
  }

  return (cssStyles: TemplateStringsArray) =>
    `@media screen and (min-width: ${Size[size]}) { ${cssStyles} }`;
};

const theme: DefaultTheme = {
  colors: {
    primaryLight: '#CDD7D9',
    primaryNeutral: '#2B549C',
    primaryDark: '#2F343C',
    accentOne: '#BDA453',
    accentTwo: '#B3192B',
    whiteTint: '#FAFAFA',
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
