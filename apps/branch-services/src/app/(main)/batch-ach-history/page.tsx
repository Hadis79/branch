'use client';
import { useDateLocaleListener } from '@branch-services/hooks';
import { loadTr, useTr } from '@branch-services/translation';
import React, { useEffect } from 'react';
import en from './locales/en';
import fa from './locales/fa';
import App from './components/app/app';
import useBatchAchHistoryStore from './store/use-widget-store';

const BatchAchHistoryWidget: React.FC = () => {
  loadTr({ en, fa });
  const [t] = useTr();
  useDateLocaleListener();
  const { resetFilter, resetMessage, resetPagination } = useBatchAchHistoryStore();

  useEffect(() => {
    return () => {
      resetFilter();
      resetMessage();
      resetPagination();
    };
  }, []);

  return <App />;
};

export default BatchAchHistoryWidget;
