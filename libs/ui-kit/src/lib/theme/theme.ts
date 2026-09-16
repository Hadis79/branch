import { useTheme } from 'styled-components';

import { Direction, IConfig, ITheme, ThemeID } from '@branch-services/types';

const getLightTheme = (direction: Direction): ITheme => {
  return {
    id: ThemeID.LIGHT,
    direction: direction,
    primary: '#007A7F',
    primaryDark: '#1f2366',
    primaryLight: 'rgba(0, 122, 127, 0.08)',
    secondary: '#646569',
    background: '#EFF0F0',
    backgroundLight: '#F6F7F7',
    surface: '#FCFCFC',
    onPrimary: '#007A7F',
    cardColor: '#F7F7F7',
    cardSecondaryColor: '#FCFCFC',
    success: '#52c41a',
    successBackground: 'rgba(0, 122, 127, 0.04)',
    error: '#FF4D4F',
    errorBackground: '#ffe9e9',
    info: '#337AB5',
    infoBackground: '#f3f4f4',
    warning: '#FFA621',
    lightGray: '#fafafa',
    iconPrimary: '#7e828a',
    textPrimary: '#414242',
    textSecondary: '#424242',
    textTerritory: '#fcfcfc',
    textQuaternary: '#d9d9d9',
    // hint: '#a4a9b0',
    divider: '#d9d9d9',
    // drawer: '#feffff',
    border: '#d9d9d9' /*textQuaternary*/,
    borderUser: '#c6e4e4ff',
    appbar: '#FCFCFC' /*primary*/,
    textHoverColor: '#168c8c',
    containers: '#FCFCFC',
    backgroundRefrence: '#FFFFFF',
    gradientBackgroundFirst: '#046067',
    gradientBackgroundSecound: '#399787',
    borderFocus: '#008080',
  };
};

const getDarkTheme = (direction: Direction): ITheme => {
  return {
    id: ThemeID.DARK,
    direction: direction,
    primary: '#369ea1ff',
    primaryDark: '#216D70',
    primaryLight: '#44808333',
    // primaryLightest: '#28283b',
    secondary: '#646569',
    background: '#161616',
    backgroundLight: '#192124',
    surface: '#1C1C1C',
    onPrimary: '#ffffff',
    cardColor: '#272727',
    cardSecondaryColor: '#353535',
    success: '#4ADE80',
    successBackground: 'rgba(0,122,127,0.04)',
    error: '#FF7172',
    errorBackground: 'rgba(255,77,79,0.1)',
    info: '#52A9FF',
    infoBackground: '#f3f4f4',
    warning: '#FFC56E',
    lightGray: '#fafafa',
    iconPrimary: '#f5f2e7',
    textPrimary: '#ffffff',
    textSecondary: '#d1d1d1ff',
    textTerritory: '#fcfcfc',
    textQuaternary: '#5e5e66',
    // textPrimaryLight: '#d9d9d9',
    // hint: '#a4a9b0',
    divider: '#3e4761',
    // drawer: '#646569',
    border: '#787878',
    borderUser: '#4E6262',
    appbar: '#10181B' /*surface*/,
    textHoverColor: '#168c8c',
    containers: '#14141F',
    backgroundRefrence: '#14141F',
    gradientBackgroundFirst: '#046067',
    gradientBackgroundSecound: '#399787',
    borderFocus: '#008080',
  };
};

export const getTheme = (config: IConfig) => {
  switch (config.themeId) {
    case ThemeID.DARK:
      return getDarkTheme(config.direction);
    case ThemeID.LIGHT:
    default:
      return getLightTheme(config.direction);
  }
};

// export default getTheme;
