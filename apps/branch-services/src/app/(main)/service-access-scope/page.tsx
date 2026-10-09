'use client';

import React, { useEffect } from 'react';
import { useDateLocaleListener } from '@branch-services/hooks';

import App from './components/app/app';
import useServiceAccessScopeStore from './store/use-widget-store';

// Translations are loaded in layout.tsx, which wraps this page.
const ServiceAccessScopeWidget: React.FC = () => {
  useDateLocaleListener();
  const resetAll = useServiceAccessScopeStore((state) => state.resetAll);

  // Start clean the next time the module is opened
  useEffect(() => resetAll, [resetAll]);

  return <App />;
};

export default ServiceAccessScopeWidget;
