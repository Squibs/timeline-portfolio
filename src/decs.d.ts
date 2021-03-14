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
      color1: string;
      /** Sapphire Blue: White Font */
      color2: string;
      /** Blue Munsell: White Font */
      color3: string;
      /** Keppel: White Font */
      color4: string;
      /** Medium Aquamarine: White Font */
      color5: string;
      /** Light Green: Black Font */
      color6: string;
      /** Inchworm: Black Font */
      color7: string;
      /** Corn: Black Font */
      color8: string;
      /** Maize Crayola: Black Font */
      color9: string;
      /** Sandy Brown: Black Font */
      color10: string;
      /** Outrageous Orange: White Font */
      color11: string;
      /** Red Salsa: White Font */
      color12: string;
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
