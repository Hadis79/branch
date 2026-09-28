'use client';

import React, { ReactNode } from 'react';
import { WidgetWrapper } from '@branch-services/layouts';
import { loadTr } from '@branch-services/translation';

import en from './locales/en';
import fa from './locales/fa';
import useWorkingHoursPage from './hooks/use-working-hours-page';
import { WorkingHoursPage } from './utils/constants';

const getHeaderTitle = (currentPage: WorkingHoursPage) =>
  currentPage === WorkingHoursPage.CREATE ? 'define_default_hours' : 'working_hours';

export default function Layout({ children }: { children: ReactNode }) {
  loadTr({ en, fa });
  const { currentPage } = useWorkingHoursPage();
  const headerTitle = getHeaderTitle(currentPage);

  return (
    <WidgetWrapper breadcrumbPrefixTitle='branch_management' headerTitle={headerTitle}>
      {children}
    </WidgetWrapper>
  );
}
