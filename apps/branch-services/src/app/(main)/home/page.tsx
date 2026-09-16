'use client';

import { useDateLocaleListener } from '@branch-services/hooks';
import React from 'react';
import Announcements from './components/announcements/announcements';
import HelpFiles from './components/help-files/help-files';
import Services from './components/services/services';
import App from './components/app/app';
import { loadTr } from '@branch-services/translation';
import fa from './locales/fa';
import en from './locales/en';
import VideoSection from './components/video-section/video-section';

const HomeWidget: React.FC = () => {
  loadTr({ en, fa });
  useDateLocaleListener();

  return (
    <App>
      <Announcements />
      <Services />
      {/*<VideoSection />*/}
      {/* <HelpFiles /> */}
    </App>
  );
};

export default HomeWidget;
