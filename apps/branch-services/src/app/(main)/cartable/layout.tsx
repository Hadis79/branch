'use client';

import { WidgetWrapper } from '@branch-services/layouts';
import { loadTr } from '@branch-services/translation';
import React, { ReactNode } from 'react';
import en from './locales/en';
import fa from './locales/fa';

function CartableLayout({ children }: { children: ReactNode }) {
  loadTr({ en, fa });

  return (
    <WidgetWrapper headerTitle={'current_requests'} isDetailsPageTitleVisible={true}>
      {children}
    </WidgetWrapper>
  );
}

export default CartableLayout;
