import React, { useEffect } from 'react';
import { ConfigProvider as AntConfigProvider } from 'antd';
import { ThemeProvider } from 'styled-components';

import { IConfig, ITheme, Direction } from '@branch-services/types';
import { useConfig } from '@branch-services/hooks';

import { getTheme } from './theme';
import { Directionality } from './directionality';
import { getAntBaseConfig } from './ant-base-config';

export interface ThemeConfigProps {
  onLocaleChange: (config: IConfig) => void;
  children: React.ReactNode;
}

const ThemeConfig = (props: ThemeConfigProps): JSX.Element => {
  const { config } = useConfig();

  const isRtl = config?.direction === Direction.RTL;

  const baseTheme: ITheme = getTheme(config);

  // console.log('ThemeConfig', config,storedConfig);

  useEffect(() => {
    if (props.onLocaleChange) {
      props.onLocaleChange(config);
    }
  }, [config.locale]);

  return (
    <ThemeProvider theme={baseTheme}>
      <Directionality isRtl={isRtl}>
        <AntConfigProvider {...getAntBaseConfig(config)}>{props.children}</AntConfigProvider>
      </Directionality>
    </ThemeProvider>
  );
};

function isEqual(prevProps, nextProps): boolean {
  return JSON.stringify(prevProps?.config ?? {}) === JSON.stringify(nextProps?.config ?? {});
}

export default ThemeConfig;
// export default React.memo(ThemeConfig, isEqual);
