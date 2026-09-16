'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { Layout } from 'antd';

import { useUserStore, useConfig, useResponsive, useUserQuery } from '@branch-services/hooks';

import Protected from '../components/protected/protected';
import Appbar from '../components/appbar/appbar';
import Drawer from '../components/drawer/drawer';
import MainContent from '../components/main-content/main-content';

import * as S from './dashboard-layout.style';
import { useTr } from '@branch-services/translation';

type DashboardLayoutProps = {
  children: ReactNode;
};

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { data } = useUserQuery();
  const { isAuth, setUserAction } = useUserStore();

  useEffect(() => {
    if (data && !isAuth) {
      setUserAction(data);
    }
  }, [data]);

  const { config } = useConfig();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const { isMobile, isMobileOrTablet, isUndefined } = useResponsive();
  const [t] = useTr();
  // const { logout } = useAuth();
  const { logout } = useUserStore();

  const toggleDrawer = () => {
    if (isMobile) {
      if (!collapsed) showDrawer();
      else onClose();
      return;
    }
    setCollapsed(!collapsed);
  };

  const showDrawer = () => {
    if (isMobile) {
      setOpenDrawer(true);
    }
  };

  const onClose = () => {
    setOpenDrawer(false);
  };

  const handleLogout = () => {
    setOpenDrawer(false);
    // console.log('logout clicked');

    logout();
  };

  function handleOnBreakpoint(broken: boolean) {
    if (broken && !collapsed) {
      setCollapsed(true);
    }
  }

  return (
    <Protected>
      <Layout>
        <Drawer
          shouldDisplaySider={!isUndefined && !isMobile}
          shouldDisplayDrawer={isMobile}
          direction={config.direction}
          openDrawer={openDrawer}
          siderCollapsed={collapsed}
          onBreakpoint={handleOnBreakpoint}
          onClose={onClose}
        />
        <S.MainContentLayout>
          <Appbar onToggleDrawer={toggleDrawer} onLogout={handleLogout} isMobileOrTablet={isMobileOrTablet} />
          <MainContent>{children}</MainContent>
        </S.MainContentLayout>
      </Layout>
    </Protected>
  );
};

export default DashboardLayout;
