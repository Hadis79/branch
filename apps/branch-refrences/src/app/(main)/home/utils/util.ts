import { ThemeID } from '@branch-services/types';

export const getHoverColor = (isHover: boolean, theme) => {
  if (theme.id === ThemeID.DARK && isHover) {
    return theme.onPrimary;
  } else if (theme.id === ThemeID.LIGHT && isHover) {
    return theme.surface;
  }
};
