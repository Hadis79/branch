'use client';
import React, { ReactNode } from 'react';

import en from './locales/en';
import fa from './locales/fa';

import { loadTr } from '@branch-services/translation';
import { WidgetWrapper } from '@branch-services/layouts';

import WorkingCalendarGroupHeaderAction from './components/header-action';
import useWorkingCalendarGroupPage from './hooks/use-working-calendar-group-page';
import { WorkingCalendarGroupPage } from './utils/constants';

const HEADER_TITLES: Record<WorkingCalendarGroupPage, string> = {
  [WorkingCalendarGroupPage.LIST]: 'working_calendar_groups',
  [WorkingCalendarGroupPage.ADD]: 'add_group',
  [WorkingCalendarGroupPage.EDIT]: 'edit_group',
  [WorkingCalendarGroupPage.DETAILS]: 'add_group',
};

function WorkingCalendarGroupsLayout({ children }: { children: ReactNode }) {
  loadTr({ en, fa });
  const { currentPage, formPage } = useWorkingCalendarGroupPage();
  // The details page keeps the title of the form it was opened from
  const titlePage = currentPage === WorkingCalendarGroupPage.DETAILS ? formPage : currentPage;

  return (
    <WidgetWrapper headerTitle={HEADER_TITLES[titlePage]} headerAction={<WorkingCalendarGroupHeaderAction />}>
      {children}
    </WidgetWrapper>
  );
}

export default WorkingCalendarGroupsLayout;
