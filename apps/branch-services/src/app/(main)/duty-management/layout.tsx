'use client';

import React, { ReactNode } from 'react';
import { WidgetWrapper } from '@branch-services/layouts';
import { loadTr } from '@branch-services/translation';

import en from './locales/en';
import fa from './locales/fa';
import HeaderAction from './components/header-action/header-action';
import useDutyPage from './hooks/use-duty-page';
import { DutyPage } from './utils/constants';

// The list sits under the unit management title; the create flow carries its own
const getHeaderTitle = (currentPage: DutyPage) => (currentPage === DutyPage.LIST ? 'unit_managemnet' : 'define_duty');

export default function Layout({ children }: { children: ReactNode }) {
  loadTr({ en, fa });
  const { currentPage } = useDutyPage();

  return (
    <WidgetWrapper
      breadcrumbPrefixTitle='unit_managemnet'
      headerTitle={getHeaderTitle(currentPage)}
      headerAction={<HeaderAction />}
    >
      {children}
    </WidgetWrapper>
  );
}
