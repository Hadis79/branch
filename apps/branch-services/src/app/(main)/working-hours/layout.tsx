'use client';

import React, { ReactNode, useState } from 'react';
import { WidgetWrapper } from '@branch-services/layouts';
import { loadTr, useTr } from '@branch-services/translation';
import { Button } from '@branch-services/ui-kit';

import en from './locales/en';
import fa from './locales/fa';
import AddExceptionModal from './components/working-hours-modal/add-exception-modal';
import useWorkingHoursPage from './hooks/use-working-hours-page';
import useWorkingHoursQuery from './queries/use-working-hours-query';
import { WorkingHoursPage } from './utils/constants';

const getHeaderTitle = (currentPage: WorkingHoursPage) =>
  currentPage === WorkingHoursPage.CREATE ? 'define_default_hours' : 'working_hours';

export default function Layout({ children }: { children: ReactNode }) {
  loadTr({ en, fa });
  const [t] = useTr();
  const { currentPage } = useWorkingHoursPage();
  const { data } = useWorkingHoursQuery();
  const [isExceptionOpen, setIsExceptionOpen] = useState(false);
  const headerTitle = getHeaderTitle(currentPage);

  const headerAction =
    currentPage === WorkingHoursPage.LIST && data ? (
      <Button type='primary' onClick={() => setIsExceptionOpen(true)}>
        {t('add_exception')}
        <i className='ri-add-line' />
      </Button>
    ) : undefined;

  return (
    <>
      <WidgetWrapper headerTitle={headerTitle} headerAction={headerAction}>
        {children}
      </WidgetWrapper>
      <AddExceptionModal open={isExceptionOpen} onClose={() => setIsExceptionOpen(false)} />
    </>
  );
}
