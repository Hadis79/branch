'use client';
import { useDateLocaleListener } from '@branch-services/hooks';
import React from 'react';
import App from './components/app/app';

const OperationsRequestsHistoryWidget: React.FC = () => {
  useDateLocaleListener();

  return <App />;
};

export default OperationsRequestsHistoryWidget;
