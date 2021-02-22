import 'styled-components';

declare module 'gatsby-plugin-transition-link/AniLink';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      /** Light Gray */
      primaryLight: string;
      /** Y In Mn Blue  */
      primaryNeutral: string;
      /** Gunmetal */
      primaryDark: string;
      /** Vegas Gold */
      accentOne: string;
      /** Upsdell Red */
      accentTwo: string;
      /** Cultured */
      whiteTint: string;
    };

    breakpoints: {
      /** 1px - 350px */
      for0SmallPhonesOnly: () => (cssStyles: TemplateStringsArray) => string;
      /** 1px - 599px */
      for1PhoneOnly: () => (cssStyles: TemplateStringsArray) => string;
      /** 600px - 767px + */
      for2SlightlyBiggerPhoneUp: () => (cssStyles: TemplateStringsArray) => string;
      /** 768px - 899px + */
      for3TabletPortraitUp: () => (cssStyles: TemplateStringsArray) => string;
      /** 900px - 1199px + */
      for4TabletLandscapeUp: () => (cssStyles: TemplateStringsArray) => string;
      /** 1200px - 1799px + */
      for5DesktopUp: () => (cssStyles: TemplateStringsArray) => string;
      /** 1800px + */
      for6BigDesktopUp: () => (cssStyles: TemplateStringsArray) => string;
    };
  }
}
