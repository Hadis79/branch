import React from 'react';
import Image from 'next/image';

import { useTr } from '@branch-services/translation';
import { ENV_CONSTANTS, fullDateLocale } from '@branch-services/utils';
import { Direction, IConfig, Locale, ThemeID } from '@branch-services/types';
import { BaamsunLogo, bankLogo, Box, Button, LocaleSwitcher, ThemeSwitch } from '@branch-services/ui-kit';

import * as S from './appbar.style';
import AppBarMenu from '../appbar-menu/appbar-menu';
import { useConfig } from '@branch-services/hooks';
import { ReactComponent as BankLogo } from './../../assets/media/meli-bank-logo.svg';

export type AppBarProps = {
  isMobileOrTablet: boolean;
  onToggleDrawer?: React.MouseEventHandler;
  onLogout?: any;
  children?: React.ReactNode;
  path?: string;
};

const Appbar = (props: AppBarProps) => {
  const { config } = useConfig();
  const { onToggleDrawer, isMobileOrTablet, path } = props;
  const [t] = useTr();

  const isDevelopment = process.env.NODE_ENV === 'development';

  const getMobileAppbar = () => {
    return (
      <>
        <Button shape={'circle'} type={'text'} className={'menu-toggle-wrapper'} onClick={onToggleDrawer}>
          <i className={'ri-menu-line'} />
          {/* {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} */}
        </Button>

        <span className={'appbar-title-logo-date'}>{<BaamsunLogo />}</span>
        <AppBarMenu path={path} />
      </>
    );
  };

  const getDesktopAppbar = () => {
    return (
      <>
        <div>
          <span className={'menu-toggle-wrapper'} onClick={onToggleDrawer}>
            <i className={'ri-menu-line'} />
            {/* {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} */}
          </span>

          <span className={'appbar-title-logo-date'}>
            {/* <BaamsunLogo /> */}
            <BankLogo />
            <span>{fullDateLocale(undefined, config.locale)}</span>
          </span>
        </div>
        {/* <span style={{ flexGrow: 1 }} /> */}

        {/* <span className={'appbar-title-bank-logo'}>
          <Image src={bankLogo} alt='Bank Melli' />
        </span> */}

        <div className='tools'>
          <ThemeSwitch />

          {ENV_CONSTANTS.IS_DEV && <LocaleSwitcher />}

          {/* <S.Divider /> */}

          {/* <span className={'appbar-item'}>
          <Button icon={<i className='ri-notification-2-fill' />} type='text' shape='circle' />
        </span> */}

          <span className={'appbar-item'}>
            <Button
              icon={<i className={config.locale === Locale.FA_IR ? 'ri-logout-box-line' : 'ri-logout-box-r-line'}></i>}
              type='text'
              shape='circle'
              onClick={props.onLogout}
            />
          </span>
        </div>
      </>
    );
  };

  return <S.AppBar>{isMobileOrTablet ? getMobileAppbar() : getDesktopAppbar()}</S.AppBar>;
};

export default Appbar;
