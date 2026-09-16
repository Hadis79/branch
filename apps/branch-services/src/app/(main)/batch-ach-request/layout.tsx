'use client';

import React from 'react';
import { WidgetStoreProvider } from './store/use-widget-store';
import { WidgetWrapper } from '@branch-services/layouts';
import { loadTr } from '@branch-services/translation';
import fa from './locales/fa';
import en from './locales/en';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  loadTr({ en, fa });

  return (
    <WidgetStoreProvider>
      <WidgetWrapper headerTitle={'batch-ach-request'} isDetailsPageTitleVisible={true} showHeaderSection={false}>
        {children}
      </WidgetWrapper>
    </WidgetStoreProvider>
  );
}
