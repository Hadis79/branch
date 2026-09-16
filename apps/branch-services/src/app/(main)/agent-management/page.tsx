'use client';
import { useDateLocaleListener } from '@branch-services/hooks';
import React, { useEffect } from 'react';
import App from './components/app/app';
import useAgentManagementWidgetStore from './store/use-widget-store';

const AgentManagementWidget: React.FC = () => {
  useDateLocaleListener();
  const { resetAll } = useAgentManagementWidgetStore();
  useEffect(() => {
    return () => {
      resetAll();
    };
  }, []);

  return <App />;
};

export default AgentManagementWidget;
