'use client';

import React, { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
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

const getHeaderAction = (
  currentPage: WorkingHoursPage,
  hasDefault: boolean,
  onAddException: () => void,
  onBack: () => void,
  t: (key: string) => string
) => {
  if (currentPage === WorkingHoursPage.LIST) {
    if (!hasDefault) return undefined;
    return (
      <Button type='primary' onClick={onAddException}>
        {t('add_exception')}
        <i className='ri-add-line' />
      </Button>
    );
  }

  // Every other page here is a form; all of them get a back button
  return (
    <Button type='link' icon={<i className='ri-arrow-left-line' />} iconPosition='end' onClick={onBack}>
      {t('button.return')}
    </Button>
  );
};

export default function Layout({ children }: { children: ReactNode }) {
  loadTr({ en, fa });
  const [t] = useTr();
  const router = useRouter();
  const { currentPage, navigateTo } = useWorkingHoursPage();
  const { data } = useWorkingHoursQuery();
  const headerTitle = getHeaderTitle(currentPage);
  const headerAction = getHeaderAction(
    currentPage,
    Boolean(data),
    () => navigateTo(WorkingHoursPage.ADD_EXCEPTION),
    () => router.back(),
    t
  );

  return (
    <WidgetWrapper breadcrumbPrefixTitle='branch_management' headerTitle={headerTitle} headerAction={headerAction}>
      {children}
    </WidgetWrapper>
  );
}
