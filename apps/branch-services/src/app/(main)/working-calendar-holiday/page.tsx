'use client';

import React, { useEffect } from 'react';
import { useDateLocaleListener } from '@branch-services/hooks';

import App from './components/app/app';
import useHolidayStore from './store/use-widget-store';

// Translations are loaded in layout.tsx, which wraps this page.
const WorkingCalendarHolidayWidget: React.FC = () => {
  useDateLocaleListener();
  const resetAll = useHolidayStore((state) => state.resetAll);

  // Start clean the next time the module is opened
  useEffect(() => resetAll, [resetAll]);

  return <App />;
};

export default WorkingCalendarHolidayWidget;
