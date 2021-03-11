import 'styled-components';
import type {} from 'styled-components/cssprop';

declare module 'gatsby-plugin-transition-link/AniLink';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      /** Light Gray: Black Font */
      primaryLight: string;
      /** Y In Mn Blue: White Font  */
      primaryNeutral: string;
      /** Gunmetal: White Font */
      primaryDark: string;
      /** Vegas Gold: Black Font */
      accentOne: string;
      /** Upsdell Red: White Font */
      accentTwo: string;
      /** Cultured: Black Font */
      whiteTint: string;
    };

    timelineColors: {
      /** Dark Slate Blue (Purple): White Font */
      colorOne: string;
      /** Sapphire Blue: White Font */
      colorTwo: string;
      /** Blue Munsell: White Font */
      colorThree: string;
      /** Keppel: White Font */
      colorFour: string;
      /** Medium Aquamarine: White Font */
      colorFive: string;
      /** Light Green: Black Font */
      colorSix: string;
      /** Inchworm: Black Font */
      colorSeven: string;
      /** Corn: Black Font */
      colorEight: string;
      /** Maize Crayola: Black Font */
      colorNine: string;
      /** Sandy Brown: Black Font */
      colorTen: string;
      /** Outrageous Orange: White Font */
      colorEleven: string;
      /** Red Salsa: White Font */
      colorTwelve: string;
      /** Silver: Black Font */
      colorGray: string;
    };

    breakpoints: {
      /** 1px - 599px: above for1SmallPhonesOnly to override styles at breakpoint */
      for0PhoneOnly: () => (cssStyles: TemplateStringsArray) => string;
      /** 1px - 350px */
      for1SmallPhonesOnly: () => (cssStyles: TemplateStringsArray) => string;
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
