'use client';

import Appbar from '../components/appbar/appbar';
import { useResponsive, useUserStore } from '@branch-services/hooks';
import * as S from './landing-layout.style';

interface LandingLayoutProps {
  children: React.ReactNode;
  path?: string;
}

function LandingLayout({ children, path }: LandingLayoutProps) {
  const { isMobileOrTablet } = useResponsive();
  const { logout } = useUserStore();

  return (
    <>
      <Appbar isMobileOrTablet={isMobileOrTablet} path={path} onLogout={() => logout(path)} />
      <S.ChildrenStyled>{children}</S.ChildrenStyled>
    </>
  );
}

export default LandingLayout;
