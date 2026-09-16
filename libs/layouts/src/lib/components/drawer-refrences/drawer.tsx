import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Badge, Empty, Input, Menu, MenuProps } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Direction, MenuModel } from '@branch-services/types';
import { cssVar } from '@branch-services/utils';

import { findActiveMenuItem, findActiveParentKeys, searchMenuItems } from '../../utils/utils';
import { ReactComponent as BankLogo } from './../../assets/media/meli-bank-logo.svg';

import * as S from './drawer.style';
import UserSection from '../user-section/user-section-refrences';
import { t } from 'i18next';
import { Button, ThemeSwitch } from '@branch-services/ui-kit';
import { useResponsive, useUserStore } from '@branch-services/hooks';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  disabled?: boolean,
  children?: MenuItem[]
): MenuItem {
  return {
    label,
    key,
    icon,
    disabled,
    children,
  } as MenuItem;
}

const staticMenu = [
  {
    id: 1,
    title: t('drawer.home'),
    href: 'home',
    active: true,
    icon: 'ri-home-4-line',
  },
  {
    id: 2,
    title: t('drawer.bach_ach_request'),
    active: true,
    icon: 'ri-exchange-line',
    children: [
      {
        id: 21,
        title: t('drawer.bach_ach'),
        href: 'create-request',
        active: true,
      },
      // {
      //   id: 22,
      //   title: t('drawer.bach_ach_ach'),
      //   href: 'create-request-ach',
      //   active: true,
      // },
      // {
      //   id: 23,
      //   title: t('drawer.bach_ach_offline'),
      //   href: 'create-request-offline',
      //   active: true,
      // },
    ],
  },
  {
    id: 3,
    title: t('drawer.bach_ach_history'),
    href: 'list-requests',
    active: true,
    icon: 'ri-history-line',
  },
];

export type DrawerProps = {
  shouldDisplaySider: boolean;
  shouldDisplayDrawer: boolean;
  openDrawer: boolean;
  direction: string;
  siderCollapsed: boolean;
  onToggleDrawer?: React.MouseEventHandler;
  children?: React.ReactNode;
  onBreakpoint?: (broken: boolean) => void;
  onClose?: () => void;
};

const Drawer = (props: DrawerProps) => {
  const {
    direction,
    shouldDisplaySider = false,
    shouldDisplayDrawer = false,
    siderCollapsed = false,
    openDrawer = false,
    onBreakpoint,
    onClose,
  } = props;

  const menuItemKeyRef = useRef();
  const [showSider, setShowSider] = useState<boolean>(true);
  const { isMobileOrTablet } = useResponsive();
  const { logout } = useUserStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [openKeys, setOpenKeys] = useState<string[]>();
  const pathname = usePathname();

  const menu = staticMenu;

  const filteredItems = useMemo(() => searchMenuItems(menu, searchQuery), [menu, searchQuery]);
  const filteredMenuItems = useMemo(() => generateMenuItems(filteredItems?.result), [filteredItems]);
  const menuSelectedKeys = useMemo(() => getDefaultSelectedKeys(), [menu, pathname]);

  function getMenuLabelNode(menuItem: MenuModel) {
    const badgeCount = 0;
    const badge = badgeCount > 0 ? <Badge className={'menu-item-badge'} count={badgeCount} showZero={false} /> : null;

    const isLink = menuItem.href && menuItem.active;

    return (
      <>
        {isLink ? (
          <Link href={`/${menuItem?.href}`} replace={true}>
            {menuItem.title}
          </Link>
        ) : (
          menuItem.title
        )}
        {badge}
      </>
    );
  }

  function generateMenuItems(menuItems: MenuModel[] | null): MenuItem[] | undefined {
    if (!menuItems) return undefined;
    return menuItems.map((menuItem) =>
      getItem(
        getMenuLabelNode(menuItem),
        menuItem?.id?.toString(),
        typeof menuItem.icon === 'string' ? <i className={menuItem.icon} /> : menuItem.icon,
        !menuItem?.active,
        menuItem.children && menuItem.children.length > 0 ? generateMenuItems(menuItem.children) : undefined
      )
    );
  }

  function handleSearchChange(e) {
    setSearchQuery(e.target.value);
  }

  function getDefaultSelectedKeys() {
    const activeMenuItem = findActiveMenuItem(menu, pathname);
    return activeMenuItem ? [activeMenuItem?.id?.toString()] : [];
  }

  const handleMenuClick = () => {
    setShowSider(true);
  };

  useEffect(() => {
    if (!showSider) {
      setOpenKeys([]);
    }
  }, [showSider]);

  useEffect(() => {
    const activeMenuItem = findActiveMenuItem(menu, pathname);
    if (activeMenuItem && activeMenuItem.id !== menuItemKeyRef.current) {
      menuItemKeyRef.current = activeMenuItem.id.toString();
      const parentKeys = findActiveParentKeys(menu, activeMenuItem.id);
      setOpenKeys([...parentKeys, activeMenuItem.id.toString()]);
    }
  }, [pathname, menu]);

  function getMenu() {
    return (
      <S.MenuWrapper showSider={showSider}>
        {!isMobileOrTablet && (
          <div
            className={showSider ? 'menu-search-input-container' : 'menu-search-input-container search-hide'}
            onClick={() => setShowSider(true)}
          >
            {showSider ? (
              <Input
                placeholder={'جستجو...'}
                onChange={handleSearchChange}
                prefix={<i className={'ri-search-line'} />}
                size='small'
              />
            ) : (
              <i className='ri-search-2-line'></i>
            )}
          </div>
        )}
        <div className='menu-content'>
          <Menu
            mode='inline'
            openKeys={openKeys}
            defaultSelectedKeys={menuSelectedKeys}
            selectedKeys={menuSelectedKeys}
            onOpenChange={(newOpenKeys: string[]) => {
              setOpenKeys(newOpenKeys);
              if (!showSider) {
                setShowSider(true);
              }
            }}
            items={filteredMenuItems}
            getPopupContainer={(node) => node.parentNode as HTMLElement}
            onClick={() => {
              handleMenuClick();
              if (isMobileOrTablet && onClose) {
                onClose();
              }
            }}
          />

          {!filteredMenuItems && <Empty style={{ marginTop: '6rem' }} description={false}></Empty>}
        </div>

        {isMobileOrTablet && (
          <Button className='quit-button' danger={true} onClick={() => logout('refrences')}>
            {t('appbar.quit')}
            <i className='ri-logout-box-line' />
          </Button>
        )}
      </S.MenuWrapper>
    );
  }

  function getMenuContainer() {
    return (
      <S.SiderItemsWrapper>
        {isMobileOrTablet && (
          <S.mobileMenu>
            <BankLogo />
            <ThemeSwitch />
          </S.mobileMenu>
        )}
        {!isMobileOrTablet && <UserSection />}
        {getMenu()}
      </S.SiderItemsWrapper>
    );
  }

  return (
    <>
      {shouldDisplaySider && (
        <S.Sider
          showSider={showSider}
          direction={direction}
          trigger={null}
          theme={'light'}
          collapsible
          collapsed={siderCollapsed}
          breakpoint={'md'}
          onBreakpoint={onBreakpoint}
          collapsedWidth={0}
          width={`var(${cssVar.drawerWidth})`}
        >
          <S.SiderItemsWrapper>
            <UserSection showSider={showSider} setShowSider={setShowSider} />
            {getMenu()}
          </S.SiderItemsWrapper>
        </S.Sider>
      )}

      {shouldDisplayDrawer && (
        <S.Drawer
          placement={direction === Direction.RTL ? 'right' : 'left'}
          closable={false}
          onClose={onClose}
          open={openDrawer}
          getContainer={'div'}
          width={`var(${cssVar.drawerWidth})`}
        >
          {getMenuContainer()}
        </S.Drawer>
      )}
    </>
  );
};

export default Drawer;
