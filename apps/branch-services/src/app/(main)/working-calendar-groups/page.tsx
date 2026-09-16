'use client';

import { useDateLocaleListener } from '@branch-services/hooks';
import { loadTr } from '@branch-services/translation';
import React, { useEffect } from 'react';
import App from './components/app/app';
import fa from './locales/fa';
import en from './locales/en';
import useWidgetStore from './store/use-widget-store';

const WorkingCalendarGroupReportWidget: React.FC = () => {
  loadTr({ en, fa });
  useDateLocaleListener();
  const { resetMessage } = useWidgetStore();
  useEffect(() => {
    return resetMessage;
  }, [resetMessage]);
  return <App />;
};

export default WorkingCalendarGroupReportWidget;
