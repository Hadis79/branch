'use client';

import { useEffect } from 'react';

import { useDateLocaleListener } from '@branch-services/hooks';

import App from './components/app/app';
import useGroupStore from './store/use-widget-store';

// Translations are loaded once in layout.tsx, which wraps this page.
const WorkingCalendarGroupsPage = () => {
  useDateLocaleListener();
  const resetMessage = useGroupStore((state) => state.resetMessage);

  // Clear the message when leaving the module
  useEffect(() => resetMessage, [resetMessage]);

  return <App />;
};

export default WorkingCalendarGroupsPage;
