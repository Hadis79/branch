import React, { ReactNode } from 'react';
import { Direction, Locale, ThemeID } from './enums';

/**
 *
 */
export interface IConfig {
  themeId: ThemeID;
  direction: Direction;
  locale: Locale;
}

export interface ITheme {
  id: string;
  direction: string;
  primary: string;
  primaryDark: string;
  primaryLight: string;
  secondary: string;
  background: string;
  backgroundLight: string;
  surface: string;
  onPrimary: string;
  cardColor: string;
  cardSecondaryColor: string;
  success: string;
  successBackground: string;
  info: string;
  infoBackground: string;
  lightGray: string;
  error: string;
  errorBackground: string;
  warning: string;
  iconPrimary: string;
  textPrimary: string;
  textSecondary: string;
  textTerritory: string;
  textQuaternary: string;
  // hint: string;
  divider: string;
  // drawer: string;
  border: string;
  appbar: string;
  textHoverColor: string;
  containers: string;
  backgroundRefrence: string;
  gradientBackgroundSecound: string;
  gradientBackgroundFirst: string;
  borderFocus: string;
  borderUser: string;
}

export type InfoItemType = {
  key: string;
  value: string | ReactNode;
  subValue?: string | ReactNode;
  displayValue?: boolean;
  type?: 'text' | 'file';
  files?: any;
  fullwidth?: boolean;
};

export interface WidgetHeaderType {
  title?: string[] | string;
  message?: string[] | string;
  icon?: React.ReactNode;
}

export type ConfigState = {
  config: IConfig;
  updateConfigStore: (newConfig: Partial<IConfig>) => void;
  removeConfigStore: () => void;
};

export type PaginationState = {
  pagination: {
    size: number;
    page: number;
    count?: number;
    current?: number;
  };
};

export interface PaginatedData<T> {
  totalElements: number;
  totalPages: number;
  size: number;
  content: T[];
  number: number;
  sort: Sort;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  // pageable: Pageable;
  empty: boolean;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}
