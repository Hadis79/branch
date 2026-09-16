import { ConfigProviderProps as AntConfigProviderProps, DirectionType } from 'antd/lib/config-provider';
import { theme as antdTheme } from 'antd';

import { IConfig, ITheme } from '@branch-services/types';

import getAntTheme from './ant-theme';
import getAntLocale from './ant-locale';
import { getTheme } from './theme';

export const getAntBaseConfig = (config: IConfig): AntConfigProviderProps => {
  const baseTheme: ITheme = getTheme(config);
  const antTheme = getAntTheme(baseTheme, antdTheme);
  const locale = getAntLocale(config.locale);

  return {
    locale: locale,
    direction: config.direction as DirectionType,
    theme: antTheme,
    componentSize: 'large',
    form: {
      validateMessages: { required: '' },
      requiredMark: false,
    },
  };
};
