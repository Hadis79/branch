'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { Layout } from 'antd';

import { useUserStore, useConfig, useResponsive, useUserRefrencesQuery } from '@branch-services/hooks';

import Protected from '../components/protected/protected';
import Appbar from '../components/appbar-user-branch/appbar';
import Drawer from '../components/drawer-refrences/drawer';
import MainContent from '../components/main-content/main-content';

import * as S from './dashboard-layout.style';
import { useTr } from '@branch-services/translation';
import useLogOutMutation from './use-logout-mutation';
import { usePathname } from 'next/navigation';
import { WidgetWrapperMobile } from '../components/widget-wrapper-mobile/widget-wrapper-mobile';

type DashboardLayoutProps = {
  children: ReactNode;
};

export const DashboardLayoutRefrences = ({ children }: DashboardLayoutProps) => {
  const { data } = useUserRefrencesQuery();
  const { isAuth, setUserAction } = useUserStore();
  const { mutate: mutateLogOut } = useLogOutMutation();

  useEffect(() => {
    if (data && !isAuth) {
      setUserAction(data);
    }
  }, [data]);

  const { config } = useConfig();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const { isMobile, isMobileOrTablet, isUndefined } = useResponsive();
  const currentPathname = usePathname();
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
    mutateLogOut();
    logout('refrences');
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
        <S.MainContentLayout style={isMobileOrTablet ? { minHeight: '100vh' } : undefined}>
          <Appbar onToggleDrawer={toggleDrawer} onLogout={handleLogout} isMobileOrTablet={isMobileOrTablet} />
          {isMobileOrTablet && <WidgetWrapperMobile headerTitle={currentPathname.split('/')[1]}></WidgetWrapperMobile>}
          <MainContent>{children}</MainContent>
        </S.MainContentLayout>
      </Layout>
    </Protected>
  );
};

export default DashboardLayoutRefrences;
