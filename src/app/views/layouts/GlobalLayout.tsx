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
        }}
      >
        <rect width="100%" height="100%" rx="5" fill="#BDA453" />
      </svg>
    );

    // eslint-disable-next-line prettier/prettier, react/jsx-one-expression-per-line
    return <div>{svg(0)}{svg(1)}{svg(2)}{svg(3)}</div>; // prettier-ignore
  };

  return (
    <>
      {createSVGs()}
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </>
  );
};

export default Layout;
