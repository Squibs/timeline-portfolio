import React from 'react';
import styled, { ThemeProvider, DefaultTheme } from 'styled-components';
import { Breakpoints, Colors, TimelineColors } from '../shared';

const BorderContainer = styled.div`
  width: calc(100% - 40px);
  height: calc(100% - 40px);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 10px solid #bda453;
  border-radius: 5px;
  /* causes lag/scrolling issues on some devices, while box-shadow does not
     this could be something to keep in mind on further projects, so I'm leaving this note
     here, that I will probably end up forgetting about. */
  /* filter: drop-shadow(0 4px 4px black); */
  box-shadow: inset 1px 2px 6px black, 0px 4px 6px black;
  pointer-events: none;
  min-width: 230px;
  z-index: 5;
  will-change: transform; // potential performance aid (https://medium.com/@kulor/one-small-css-hack-to-improve-scrolling-performance-c5238029e518)
`;

const mediaQuery = (size: keyof typeof Breakpoints) => {
  if (size === 'for0PhoneOnly') {
    return (cssStyles: TemplateStringsArray) =>
      `@media screen and (max-width: ${Breakpoints[size]}) { ${cssStyles} }`;
  }

  if (size === 'for1SmallPhonesOnly') {
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

  timelineColors: {
    color1: TimelineColors.color1,
    color2: TimelineColors.color2,
    color3: TimelineColors.color3,
    color4: TimelineColors.color4,
    color5: TimelineColors.color5,
    color6: TimelineColors.color6,
    color7: TimelineColors.color7,
    color8: TimelineColors.color8,
    color9: TimelineColors.color9,
    color10: TimelineColors.color10,
    color11: TimelineColors.color11,
    color12: TimelineColors.color12,
    colorGray: TimelineColors.colorGray,
  },

  breakpoints: {
    for0PhoneOnly: () => mediaQuery('for0PhoneOnly'),
    for1SmallPhonesOnly: () => mediaQuery('for1SmallPhonesOnly'),
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
