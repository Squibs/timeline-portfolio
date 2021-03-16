import React from 'react';
import { ThemeProvider, DefaultTheme } from 'styled-components';
import { Breakpoints, Colors, TimelineColors } from '../shared';

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
      {/* https://css-tricks.com/heres-how-i-solved-a-weird-bug-using-tried-and-true-debugging-strategies/ */}
      <svg xmlns="http://www.w3.org/2000/svg" style={{ height: 0, width: 0, position: 'absolute' }}>
        <defs>
          <filter id="inset-shadow">
            <feOffset dx="12" dy="2" />
            <feGaussianBlur stdDeviation="10" result="offset-blur" />
            <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
            <feFlood floodColor="black" floodOpacity="1" result="color" />
            <feComposite operator="in" in="color" in2="inverse" result="shadow" />
            <feComponentTransfer in="shadow" result="shadow">
              <feFuncA type="linear" slope=".75" />
            </feComponentTransfer>
            <feComposite operator="over" in="shadow" in2="SourceGraphic" />
          </filter>
        </defs>
      </svg>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </>
  );
};

export default Layout;
