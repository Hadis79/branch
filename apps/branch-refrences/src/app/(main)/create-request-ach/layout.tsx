'use client';

import React, { useEffect } from 'react';
import useWidgetStore, { WidgetStoreProvider } from './store/use-widget-store';
import { WidgetWrapper } from '@branch-services/layouts';
import { loadTr } from '@branch-services/translation';
import fa from './locales/fa';
import en from './locales/en';

function InnerLayout({ children }: { children: React.ReactNode }) {
  const { activeWithdrawalType, resetActiveWithdrawalType } = useWidgetStore((state) => state);
  useEffect(() => {
    return resetActiveWithdrawalType;
  }, []);
  return (
    <WidgetWrapper
      activeWithdrawalType={activeWithdrawalType}
      headerTitle={'create-request-ach'}
      isDetailsPageTitleVisible={true}
    >
      {children}
    </WidgetWrapper>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  loadTr({ en, fa });

  return (
    <WidgetStoreProvider>
      <InnerLayout>{children}</InnerLayout>
    </WidgetStoreProvider>
  );
}
