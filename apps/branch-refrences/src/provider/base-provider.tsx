'use client';
import { ReactNode } from 'react';

import { ThemeConfig } from '@branch-services/ui-kit';
import { changeLanguage } from '@branch-services/translation';
import { changeDayjsCalendar } from '@branch-services/utils';
import { AppErrorBoundary } from '@branch-services/layouts';
import { IConfig } from '@branch-services/types';

import GlobalStyles from '../../styles/global.style';
import { useReactQueryClient } from '@branch-services/hooks';

type BaseProviderProps = {
  children: ReactNode;
};

export const BaseProvider = ({ children }: BaseProviderProps) => {
  const handleLocaleChange = (config: IConfig) => {
    changeLanguage(config.locale);
    changeDayjsCalendar(config.locale);
  };
  const { ProviderQueryClient } = useReactQueryClient();
  return (
    <>
      <ThemeConfig onLocaleChange={handleLocaleChange}>
        <AppErrorBoundary>
          <ProviderQueryClient>
            <GlobalStyles />
            {children}
          </ProviderQueryClient>
        </AppErrorBoundary>
      </ThemeConfig>
    </>
  );
};
