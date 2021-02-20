import 'styled-components';

declare module 'gatsby-plugin-transition-link/AniLink';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primaryLight: string;
      primaryNeutral: string;
      primaryDark: string;
      accentOne: string;
      accentTwo: string;
      whiteTint: string;
    };
  }
}
