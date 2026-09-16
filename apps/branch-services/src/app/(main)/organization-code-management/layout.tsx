'use client';

import React, { ReactNode } from 'react';
import { WidgetWrapper } from '@branch-services/layouts';
import { loadTr, useTr } from '@branch-services/translation';
import { Button } from '@branch-services/ui-kit';
import en from './locales/en';
import fa from './locales/fa';
import useOrganizationCodeStore from './store/use-widget-store';

export default function Layout({ children }: { children: ReactNode }) {
  loadTr({ en, fa });
  const [t] = useTr();
  const view = useOrganizationCodeStore((state) => state.view);
  const startCreate = useOrganizationCodeStore((state) => state.startCreate);
  const headerTitle = view === 'list' ? 'organization-code-management' : 'new-organization-code';
  const headerAction =
    view === 'list' ? (
      <Button type='primary' onClick={startCreate}>
        {t('add_new_organization_code')}
        <i className='ri-add-line' />
      </Button>
    ) : undefined;

  return (
    <WidgetWrapper headerTitle={headerTitle} headerAction={headerAction} overflow_x='hidden'>
      {children}
    </WidgetWrapper>
  );
}
