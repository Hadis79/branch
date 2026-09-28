'use client';

import React, { ReactNode } from 'react';
import { WidgetWrapper } from '@branch-services/layouts';
import { loadTr, useTr } from '@branch-services/translation';
import { Button } from '@branch-services/ui-kit';

import en from './locales/en';
import fa from './locales/fa';
import useWorkingHoursPage from './hooks/use-working-hours-page';
import useWorkingHoursQuery from './queries/use-working-hours-query';
import { WorkingHoursPage } from './utils/constants';

const getHeaderTitle = (currentPage: WorkingHoursPage) => {
  if (currentPage === WorkingHoursPage.CREATE) return 'define_default_hours';
  if (currentPage === WorkingHoursPage.ADD_EXCEPTION) return 'add_exception';
  return 'working_hours';
};

export default function Layout({ children }: { children: ReactNode }) {
  loadTr({ en, fa });
  const [t] = useTr();
  const { currentPage, navigateTo } = useWorkingHoursPage();
  const { data } = useWorkingHoursQuery();
  const headerTitle = getHeaderTitle(currentPage);

  const headerAction =
    currentPage === WorkingHoursPage.LIST && data ? (
      <Button type='primary' onClick={() => navigateTo(WorkingHoursPage.ADD_EXCEPTION)}>
        {t('add_exception')}
        <i className='ri-add-line' />
      </Button>
    ) : undefined;

  return (
    <WidgetWrapper breadcrumbPrefixTitle='branch_management' headerTitle={headerTitle} headerAction={headerAction}>
      {children}
    </WidgetWrapper>
  );
}
