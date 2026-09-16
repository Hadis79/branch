'use client';

import { useDateLocaleListener } from '@branch-services/hooks';
import React from 'react';
import Announcements from './components/announcements/announcements';
import Services from './components/services/services';
import App from './components/app/app';
import { loadTr } from '@branch-services/translation';
import fa from './locales/fa';
import en from './locales/en';

const HomeWidget: React.FC = () => {
  loadTr({ en, fa });
  useDateLocaleListener();

  return (
    <App>
      <Announcements />
      <Services />
    </App>
  );
};

export default HomeWidget;
