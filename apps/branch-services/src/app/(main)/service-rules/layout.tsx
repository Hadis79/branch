'use client';

import React, { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { WidgetWrapper } from '@branch-services/layouts';
import { loadTr, useTr } from '@branch-services/translation';
import { Button } from '@branch-services/ui-kit';

import en from './locales/en';
import fa from './locales/fa';
import useServiceRulesPage from './hooks/use-service-rules-page';
import { ServiceRulesPage } from './utils/constants';

const getHeaderTitle = (currentPage: ServiceRulesPage) =>
  currentPage === ServiceRulesPage.CREATE ? 'new_rule' : 'service_rules';

const getHeaderAction = (
  currentPage: ServiceRulesPage,
  onCreate: () => void,
  onBack: () => void,
  t: (key: string) => string
) => {
  if (currentPage === ServiceRulesPage.LIST)
    return (
      <Button type='primary' onClick={onCreate}>
        {t('new_rule')}
        <i className='ri-add-line' />
      </Button>
    );

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
  const { currentPage, navigateTo } = useServiceRulesPage();
  const headerAction = getHeaderAction(
    currentPage,
    () => navigateTo(ServiceRulesPage.CREATE),
    () => router.back(),
    t
  );

  return (
    <WidgetWrapper
      breadcrumbPrefixTitle='unit_managemnet'
      headerTitle={getHeaderTitle(currentPage)}
      headerAction={headerAction}
    >
      {children}
    </WidgetWrapper>
  );
}
