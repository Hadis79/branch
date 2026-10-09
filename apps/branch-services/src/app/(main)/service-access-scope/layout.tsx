'use client';

import React, { ReactNode } from 'react';
import { WidgetWrapper } from '@branch-services/layouts';
import { loadTr } from '@branch-services/translation';

import en from './locales/en';
import fa from './locales/fa';
import HeaderAction from './components/header-action/header-action';

export default function Layout({ children }: { children: ReactNode }) {
  loadTr({ en, fa });

  return (
    <WidgetWrapper
      breadcrumbPrefixTitle='unit_managemnet'
      headerTitle='service_access_scope'
      headerAction={<HeaderAction />}
    >
      {children}
    </WidgetWrapper>
  );
}
