'use client';

import React, { useEffect } from 'react';
import { useDateLocaleListener } from '@branch-services/hooks';

import App from './components/app/app';
import useServiceRulesStore from './store/use-widget-store';

// Translations are loaded in layout.tsx, which wraps this page.
const ServiceRulesWidget: React.FC = () => {
  useDateLocaleListener();
  const resetAll = useServiceRulesStore((state) => state.resetAll);

  // Start clean the next time the module is opened
  useEffect(() => resetAll, [resetAll]);

  return <App />;
};

export default ServiceRulesWidget;
