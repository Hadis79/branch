'use client';
import React, { ReactNode } from 'react';

import en from './locales/en';
import fa from './locales/fa';

import { loadTr } from '@branch-services/translation';
import { WidgetWrapper } from '@branch-services/layouts';

import WorkingCalendarGroupHeaderAction from './components/header-action';

function WorkingCalendarGroupsLayout({ children }: { children: ReactNode }) {
  loadTr({ en, fa });

  return (
    <WidgetWrapper
      headerTitle='working_calendar_groups'
      isDetailsPageTitleVisible
      headerAction={<WorkingCalendarGroupHeaderAction />}
    >
      {children}
    </WidgetWrapper>
  );
}

export default WorkingCalendarGroupsLayout;
