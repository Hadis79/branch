'use client';

import React, { useEffect } from 'react';

import App from './components/app/app';
import useWorkingHoursStore from './store/use-widget-store';

// Translations are loaded in layout.tsx, which wraps this page.
const WorkingHoursWidget: React.FC = () => {
  const resetAll = useWorkingHoursStore((state) => state.resetAll);

  // Start clean the next time the module is opened
  useEffect(() => resetAll, [resetAll]);

  return <App />;
};

export default WorkingHoursWidget;
