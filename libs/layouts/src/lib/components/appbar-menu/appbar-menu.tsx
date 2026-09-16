import React, { useRef } from 'react';

import { Form, MenuProps } from 'antd';

import { Button, LocaleSwitcher, ThemeSwitch } from '@branch-services/ui-kit';
import { useTr } from '@branch-services/translation';
import { CONSTANTS } from '@branch-services/utils';
import { useAuth, useConfig, useUserStore } from '@branch-services/hooks';

import * as S from './appbar-menu.style';

enum MenuItemKey {
  ChangeLanguage = 'changeLanguage',
  BackgroundColor = 'backgroundColor',
  Divider = 'divider',
  Notifications = 'notifications',
  Logout = 'logout',
  ContactUs = 'contactUs',
}

export type AppBarMenuProps = {
  color?: string;
  path?: string;
};

export interface LocaleSwitcherRef {
  onToggleLocale: () => void;
}

const AppBarMenu = (props: AppBarMenuProps) => {
  const { color = 'onPrimary', path } = props;
  const [t] = useTr();
  const localeSwitcherRef = useRef<LocaleSwitcherRef | null>(null);

  // const { isAuth, logout } = useAuth();
  const { isAuth, logout } = useUserStore();
  const { config, updateConfig } = useConfig();

  const [logoutForm] = Form.useForm();

  const isDevelopment = process.env.NODE_ENV === 'development';

  const menuObject = [
    {
      labelTitle: t('appbar.change_language'),
      secondItem: <LocaleSwitcher ref={localeSwitcherRef} type='textPrimary' />,
      key: MenuItemKey.ChangeLanguage,
    },
    { labelTitle: t('appbar.background_color'), secondItem: <ThemeSwitch />, key: MenuItemKey.BackgroundColor },
    { type: MenuItemKey.Divider },
    { labelTitle: isAuth ? t('appbar.notifications') : t('layout.register_link'), key: MenuItemKey.Notifications },
    {
      labelTitle: isAuth ? t('appbar.logout') : t('layout.contact_us_link'),
      key: isAuth ? MenuItemKey.Logout : MenuItemKey.ContactUs,
    },
  ];

  const callToggleFunction = () => {
    if (localeSwitcherRef.current) {
      localeSwitcherRef?.current?.onToggleLocale();
    }
  };

  const items: any /*MenuProps['items']*/ = menuObject
    // .filter((item) => !(item.key === MenuItemKey.ChangeLanguage && !isDevelopment))
    .map((item, index) => {
      return {
        label: (
          <div className='multiple-menu'>
            <span>{item.labelTitle}</span>
            {item.secondItem && <span className={'second-item'}>{item.secondItem}</span>}
          </div>
        ),
        type: item.type ?? null,
        key: item.key,
      };
    });

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    switch (key) {
      case MenuItemKey.ChangeLanguage:
        callToggleFunction();
        break;
      case MenuItemKey.BackgroundColor:
      case MenuItemKey.Divider:
        break;
      case MenuItemKey.Notifications:
        if (isAuth) {
          // Handle notification click
        } else {
          window.open(CONSTANTS.REGISTER_LINK, '_blank');
        }
        break;
      case MenuItemKey.Logout:
        if (isAuth) {
          logoutForm.submit();
          logout(path);
        }
        break;
      case MenuItemKey.ContactUs:
        window.open(CONSTANTS.CONTACT_US_LINK, '_blank');
        break;
      default:
        console.warn(`Unrecognized menu item key: ${key}`);
      // Handle unrecognized key
    }
  };

  const menuStyle = {
    padding: '0.5rem 0',
    display: 'flex',
    flexDirection: 'column',
    gap: ' 0.5rem',
  };
  return (
    <S.AppBarMenuContainer
      menu={{ items, onClick: handleMenuClick }}
      trigger={['click']}
      color={color}
      dropdownRender={(menu) => {
        return (
          <S.DropdownRender>{React.cloneElement(menu as React.ReactElement, { style: menuStyle })}</S.DropdownRender>
        );
      }}
    >
      <Button
        type='text'
        shape='circle'
        icon={
          <span className={'appbar-menu-icon'}>
            <i className='ri-more-2-line' />
          </span>
        }
      />
    </S.AppBarMenuContainer>
  );
};
export default AppBarMenu;
