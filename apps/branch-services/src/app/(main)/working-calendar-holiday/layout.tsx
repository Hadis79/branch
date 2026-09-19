'use client';

import React, { ReactNode } from 'react';
import { WidgetWrapper } from '@branch-services/layouts';
import { loadTr } from '@branch-services/translation';

import en from './locales/en';
import fa from './locales/fa';
import HolidayHeaderAction from './components/header-action/header-action';
import useHolidayPage from './hooks/use-holiday-page';
import { HolidayPage } from './utils/constants';

const CREATE_PAGES = [HolidayPage.UPLOAD, HolidayPage.UPLOAD_DETAILS, HolidayPage.MANUAL];

export default function Layout({ children }: { children: ReactNode }) {
  loadTr({ en, fa });
  const { currentPage } = useHolidayPage();
  const headerTitle = CREATE_PAGES.includes(currentPage) ? 'new_holiday' : 'working_calendar_holiday';

  return (
    <WidgetWrapper headerTitle={headerTitle} headerAction={<HolidayHeaderAction />}>
      {children}
    </WidgetWrapper>
  );
}
