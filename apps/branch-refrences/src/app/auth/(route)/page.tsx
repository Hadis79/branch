'use client';
import { useDateLocaleListener } from '@branch-services/hooks';
import React from 'react';
import App from '../components/app/app';
import Login from '../components/login/login';

const AuthWidget: React.FC = () => {
  useDateLocaleListener();

  return (
    <App>
      <Login></Login>
    </App>
  );
};

export default AuthWidget;
