'use client';

import React, { ReactNode } from 'react';
import { WidgetWrapper } from '@branch-services/layouts';
import { loadTr } from '@branch-services/translation';
import en from './locales/en';
import fa from './locales/fa';

export default function Layout({ children }: { children: ReactNode }) {
  loadTr({ en, fa });
  return (
    <WidgetWrapper headerTitle={'new-requests'} isDetailsPageTitleVisible={true}>
      {children}
    </WidgetWrapper>
  );
}
