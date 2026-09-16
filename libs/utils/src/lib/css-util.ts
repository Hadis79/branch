import { ThemeID } from '@branch-services/types';

export const breakpoints = {
  xs: '30em', // 480px / 16px(1em)
  sm: '36em', // 576px / 16px(1em)
  md: '48em', // 768px / 16px(1em)
  lg: '64em', // 1024px / 16px(1em)
  xl: '75em', // 1200px / 16px(1em)
  xxl: '100em', // 1600px / 16px(1em)
};

type BreakpointKey = keyof typeof breakpoints;

export const cssVar = {
  appBarHeight: '--appbar-height',
  drawerWidth: '--drawer-width',
  drawerClosedWidth: '--drawer-closed-width',
  drawerSideGap: '--drawer-side-gap',
  verticalGap: '--vertical-gap',
  mainContentMargin: '--main-content-margin',
  radius: '--radius',
  appbarZIndex: '--appbar-z-index',
};

export const respondTo = {
  mobile: `@media only screen and (max-width: ${breakpoints.xs})`,
  tablet: `@media only screen and (min-width: calc(${breakpoints.xs} + 1px)) and (max-width: ${breakpoints.lg})`,
  desktop: `@media only screen and (min-width: calc(${breakpoints.lg} + 1px))`,

  up: (breakpoint: BreakpointKey): string => {
    if (!breakpoints[breakpoint]) {
      return '';
    }

    return `@media only screen and (min-width: ${breakpoints[breakpoint]})`;
  },

  down: (breakpoint: BreakpointKey): string => {
    if (!breakpoints[breakpoint]) {
      return '';
    }

    return `@media only screen and (max-width: ${breakpoints[breakpoint]})`;
  },

  between: (firstBreakpoint: BreakpointKey, secondBreakpoint: BreakpointKey): string => {
    if (!breakpoints[firstBreakpoint] || !breakpoints[secondBreakpoint]) {
      return '';
    }

    const min = Math.min(
      +breakpoints[firstBreakpoint].replace('em', ''),
      +breakpoints[secondBreakpoint].replace('em', '')
    );
    const max = Math.max(
      +breakpoints[firstBreakpoint].replace('em', ''),
      +breakpoints[secondBreakpoint].replace('em', '')
    );

    return `@media only screen and (min-width: ${min}em) and (max-width: ${max}em)`;
  },
};

export const withOpacity = (hex: string, opacity: number): string => {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);
  const alpha = opacity / 100;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const getRelatedColor = (themeId: string, lightColor: string, darkColor: string): string => {
  const color = themeId === ThemeID.DARK ? darkColor : lightColor;
  return color;
};

export const hideScrollbar = (): string => {
  return `
    scrollbar-width: none !important;
  `;
};

export const boxShadowColor = `rgba(0, 0, 0, 0.2)`;
export const boxShadow = `inset 0 0 3px 0 ${boxShadowColor};`;
export const boxShadowThin = `inset 0 0 1.5px 0 ${boxShadowColor};`;
