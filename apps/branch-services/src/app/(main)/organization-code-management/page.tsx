'use client';

import { useDateLocaleListener } from '@branch-services/hooks';
import React, { useEffect } from 'react';
import App from './components/app/app';
import useOrganizationCodeStore from './store/use-widget-store';

const OrganizationCodeManagementWidget: React.FC = () => {
  useDateLocaleListener();
  const resetAll = useOrganizationCodeStore((state) => state.resetAll);

  useEffect(() => resetAll, [resetAll]);

  return <App />;
};

export default OrganizationCodeManagementWidget;
