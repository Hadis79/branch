'use client';

import { useDateLocaleListener } from '@branch-services/hooks';
import { loadTr } from '@branch-services/translation';
import React, { useEffect } from 'react';
import App from './components/app/app';
import fa from './locales/fa';
import en from './locales/en';
import useCartableStore from './store/use-cartable-store';

const CartableWidget: React.FC = () => {
  loadTr({ en, fa });
  useDateLocaleListener();
  const { resetFilter, resetMessage } = useCartableStore();
  useEffect(() => {
    return () => {
      resetFilter();
      resetMessage();
    };
  }, []);
  return <App />;
};

export default CartableWidget;
