import React from 'react';
import styled, { ThemeProvider, DefaultTheme } from 'styled-components';

const BorderContainer = styled.div`
  // prevent top and bottom border svg from shrinking
  & > svg:nth-child(2n - 1) {
    min-width: 230px;
  }

  // prevent right border svg from moving to the right
  @media screen and (max-width: 250px) {
    & > svg:nth-child(2) {
      left: 230px;
    }
  }
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
  const createSVGs = () => {
    const svgLong = 'calc(100% - 20px)'; // longer of the two dimensions
    const svgShort = '10px'; // shorter of the two dimensions | also works as distance from edge

    // 0: top, 1: right, 2: bottom, 3: left
    const svg = (position: 0 | 1 | 2 | 3) => (
      <svg
        width={position === 0 || position === 2 ? svgLong : svgShort}
        height={position === 0 || position === 2 ? svgShort : svgLong}
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: 'absolute',
          top: `${position !== 2 && svgShort}`.replace('false', ''),
          right: `${position === 1 && svgShort}`.replace('false', ''),
          bottom: `${position === 2 && svgShort}`.replace('false', ''),
          left: `${position !== 1 && svgShort}`.replace('false', ''),
          filter: 'drop-shadow(0 4px 4px black)',
        }}
      >
        <rect width="100%" height="100%" rx="5" fill="#BDA453" />
      </svg>
    );

    // eslint-disable-next-line prettier/prettier, react/jsx-one-expression-per-line
    return <BorderContainer>{svg(0)}{svg(1)}{svg(2)}{svg(3)}</BorderContainer>; // prettier-ignore
  };

  return (
    <>
      {/* {createSVGs()} */}

      {/* move into already made border container styled-component if keeping; delete everything else */}
      <div
        css={`
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
        `}
      />

      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </>
  );
};

export default Layout;
