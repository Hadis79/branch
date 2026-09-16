'use client';
import { useTr } from '@branch-services/translation';
import React from 'react';

function Page() {
  const [t] = useTr();
  return <div style={{ textAlign: 'center' }}>{t('add')}</div>;
}

export default Page;
