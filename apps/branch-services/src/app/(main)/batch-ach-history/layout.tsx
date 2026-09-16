'use client';

import React, { ReactNode } from 'react';
import { WidgetWrapper } from '@branch-services/layouts';
import { loadTr } from '@branch-services/translation';
import en from './locales/en';
import fa from './locales/fa';

export default function BatchAchHistoryLayout({ children }: { children: ReactNode }) {
  loadTr({ en, fa });

  return (
    <WidgetWrapper headerTitle={'request-history'} isDetailsPageTitleVisible={true}>
      {children}
    </WidgetWrapper>
  );
}
