import { ITheme, ThemeID } from '@branch-services/types';

const getLightTheme = (themeBase: ITheme) => {
  return {
    token: {
      colorPrimary: themeBase.primary,
    },
  };
};

function getDarkTheme(themeBase: ITheme) {
  return {
    token: {
      colorPrimary: themeBase.primary,
    },
  };
}

function makeTheme(themeBase: ITheme, antTheme: any) {
  return {
    token: {
      fontFamily: 'inherit',
      colorPrimary: themeBase.primary,
      // colorTextBase: themeBase.textPrimary,
      // colorBgBase: themeBase.background,
      colorBgContainer: 'transparent',
      colorBgLayout: themeBase.background,
      // colorBgContainer: themeBase.surface,
      //
    },
    algorithm: themeBase.id === ThemeID.DARK ? antTheme.darkAlgorithm : antTheme.defaultAlgorithm,
    components: {
      Tree: {
        nodeSelectedBg: themeBase.primaryLight,
      },
      TreeSelect: {
        nodeSelectedBg: themeBase.primaryLight,
      },
      Modal: {
        contentBg: themeBase.surface,
        headerBg: themeBase.surface,
        footerBg: themeBase.surface,
      },
    },
  };
}

const getAntTheme = (themeBase: ITheme, antTheme: any) => {
  return makeTheme(themeBase, antTheme);
};

export const getOldAntTheme = (themeBase: ITheme) => {
  switch (themeBase.id) {
    case ThemeID.DARK:
      return getDarkTheme(themeBase);
    case ThemeID.LIGHT:
    default:
      return getLightTheme(themeBase);
  }
};

export default getAntTheme;
