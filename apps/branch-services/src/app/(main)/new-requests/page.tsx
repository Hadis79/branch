'use client';
import { useDateLocaleListener } from '@branch-services/hooks';
import React, { useEffect } from 'react';
import App from './components/app/app';
import useNewRequestsWidgetStore from './store/use-widget-store';

const NewRequestsWidget: React.FC = () => {
  useDateLocaleListener();
  const { resetAll } = useNewRequestsWidgetStore();

  useEffect(() => {
    return () => {
      resetAll();
    };
  }, []);

  return <App />;
};

export default NewRequestsWidget;
