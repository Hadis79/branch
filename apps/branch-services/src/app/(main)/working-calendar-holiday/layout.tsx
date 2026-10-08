'use client';

import React, { ReactNode } from 'react';
import { WidgetWrapper } from '@branch-services/layouts';
import { loadTr } from '@branch-services/translation';

import en from './locales/en';
import fa from './locales/fa';
import HolidayHeaderAction from './components/header-action/header-action';
import useHolidayPage from './hooks/use-holiday-page';
import { HolidayPage } from './utils/constants';

const HEADER_TITLES: Record<HolidayPage, string> = {
  [HolidayPage.LIST]: 'working_calendar_holiday',
  [HolidayPage.CREATE]: 'new_holiday',
  [HolidayPage.UPLOAD_DETAILS]: 'new_holiday',
};

export default function Layout({ children }: { children: ReactNode }) {
  loadTr({ en, fa });
  const { currentPage } = useHolidayPage();

  return (
    <WidgetWrapper
      breadcrumbPrefixTitle='calendar_and_base_information'
      headerTitle={HEADER_TITLES[currentPage]}
      headerAction={<HolidayHeaderAction />}
    >
      {children}
    </WidgetWrapper>
  );
}
