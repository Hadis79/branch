'use client';

import React, { ReactNode } from 'react';
import { WidgetWrapper } from '@branch-services/layouts';
import { loadTr } from '@branch-services/translation';

import en from './locales/en';
import fa from './locales/fa';
import HolidayHeaderAction from './components/header-action/header-action';
import useHolidayPage from './hooks/use-holiday-page';
import useHolidayStore from './store/use-widget-store';
import { HolidayPage } from './utils/constants';

const CREATE_PAGES = [HolidayPage.UPLOAD, HolidayPage.UPLOAD_DETAILS, HolidayPage.MANUAL];

const getHeaderTitle = (currentPage: HolidayPage, formOrigin: HolidayPage | null) => {
  const isEdit =
    currentPage === HolidayPage.EDIT ||
    ((currentPage === HolidayPage.UPLOAD_DETAILS || currentPage === HolidayPage.DETAILS) &&
      formOrigin === HolidayPage.EDIT);
  if (isEdit) return 'edit_official_title';
  if (CREATE_PAGES.includes(currentPage)) return 'new_holiday';
  return 'working_calendar_holiday';
};

export default function Layout({ children }: { children: ReactNode }) {
  loadTr({ en, fa });
  const { currentPage } = useHolidayPage();
  const formOrigin = useHolidayStore((state) => state.formOrigin);
  const headerTitle = getHeaderTitle(currentPage, formOrigin);

  return (
    <WidgetWrapper headerTitle={headerTitle} headerAction={<HolidayHeaderAction />}>
      {children}
    </WidgetWrapper>
  );
}
