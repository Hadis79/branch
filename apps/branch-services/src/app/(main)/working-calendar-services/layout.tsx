'use client';

import React, { ReactNode } from 'react';
import { WidgetWrapper } from '@branch-services/layouts';
import { loadTr } from '@branch-services/translation';

import en from './locales/en';
import fa from './locales/fa';
import ServiceHeaderAction from './components/header-action/header-action';

export default function Layout({ children }: { children: ReactNode }) {
  loadTr({ en, fa });

  return (
    <WidgetWrapper headerTitle='working_calendar_services' headerAction={<ServiceHeaderAction />}>
      {children}
    </WidgetWrapper>
  );
}
