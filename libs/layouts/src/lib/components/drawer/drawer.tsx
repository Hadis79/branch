import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Badge, Empty, Input, Menu, MenuProps, Result } from 'antd';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { useConfig, useMenuQuery, useMenuStore, useUserStore } from '@branch-services/hooks';
import { useTr } from '@branch-services/translation';
import { Direction, MenuModel } from '@branch-services/types';
import { Box, Button, Loading } from '@branch-services/ui-kit';
import { cssVar } from '@branch-services/utils';

import { findActiveMenuItem, findActiveParentKeys, searchMenuItems } from '../../utils/utils';

import * as S from './drawer.style';
import UserSection from '../user-section/user-section';

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
  // const { setWidgetName } = useGlobalStore();
  const router = useRouter();
  const {
    direction,
    shouldDisplaySider = false,
    shouldDisplayDrawer = false,
    siderCollapsed = false,
    openDrawer = false,
    onBreakpoint,
    onClose,
  } = props;

  const { user } = useUserStore();
  const { config } = useConfig();
  const prevLocaleRef = useRef(config.locale);
  const menuItemKeyRef = useRef();
  const [showSider, setShowSider] = useState<boolean>(true);

  const [t] = useTr();
  const [searchQuery, setSearchQuery] = useState('');
  const [openKeys, setOpenKeys] = useState<string[]>();
  const pathname = usePathname();

  const { data, isLoading, isError, refetch } = useMenuQuery();
  const { menu, updateMenu } = useMenuStore();

  const filteredItems = useMemo(() => searchMenuItems(menu, searchQuery), [menu, searchQuery]);

  const filteredMenuItems = useMemo(() => generateMenuItems(filteredItems?.result), [filteredItems]);
  const menuSelectedKeys = useMemo(() => getDefaultSelectedKeys(), [menu, data, pathname]);

  useEffect(() => {
    if (data) {
      updateMenu(data);
    }
  }, [data]);

  useEffect(() => {
    onClose?.();
  }, [pathname]);

  useEffect(() => {
    // if (!menu) {
    //   refetch();
    // }
    getActiveParentkeys();
  }, [data]);

  useEffect(() => {
    if (prevLocaleRef.current !== config.locale) {
      refetch();
      prevLocaleRef.current = config.locale;
    }
    getActiveParentkeys();
  }, [config.locale]);

  useEffect(() => {
    if (!user) {
      fetchUserProfile();
    }
  }, []);

  const fetchUserProfile = async () => {
    // try {
    //   const response = await executeUserProfile(async () => await Api.getUserProfile());
    //   setUser(response);
    //   return response;
    // } catch (error) {
    //   return null;
    // }
  };

  function getMenuLabelNode(menuItem: MenuModel) {
    const badgeCount = 0; // Replace with your non-zero value
    const badge = badgeCount > 0 ? <Badge className={'menu-item-badge'} count={badgeCount} showZero={false} /> : null;
    // setWidgetName(menuItem.id);

    const isLink = menuItem.href && menuItem.active;

    return (
      <>
        {isLink ? (
          <Link href={`/${menuItem.href}`} replace={true}>
            {menuItem.title}
          </Link>
        ) : (
          menuItem.title
        )}
        {/* {isLink ? <div onClick={() => router.push(`${menuItem.href}`)}>{menuItem.title}</div> : menuItem.title} */}
        {badge}
      </>
    );
  }

  function generateMenuItems(menuItems: MenuModel[] | null): MenuItem[] | undefined {
    const items: MenuItem[] = [];

    if (!menuItems) return undefined;

    menuItems.forEach((menuItem) => {
      const item: MenuItem = getItem(
        getMenuLabelNode(menuItem),
        menuItem?.id?.toString(),
        menuItem.icon ? <i className={menuItem.icon} /> : undefined,
        !menuItem?.active,
        menuItem.children && menuItem.children.length > 0 ? generateMenuItems(menuItem.children) : undefined
      );
      items.push(item);
    });

    return items.length > 0 ? items : undefined;
  }

  function handleSearchChange(e) {
    setSearchQuery(e.target.value);
  }

  function handleMenuTryAgain(e) {
    // fetchMenu();
    refetch();
  }

  function getDefaultSelectedKeys() {
    const activeMenuItem = findActiveMenuItem(data ?? menu, pathname);

    if (!activeMenuItem) {
      return [];
    }

    return [activeMenuItem?.id?.toString()];
  }

  function getActiveParentkeys() {
    if (!data) return false;
    const activeKeys = findActiveParentKeys(data ?? menu, +menuSelectedKeys[0]);
    setOpenKeys(activeKeys);
  }

  const handleMenuClick = (item) => {
    setShowSider(true);

    // if (item.key == menuItemKeyRef.current) {
    //   window.location.reload();
    // } else {
    //   menuItemKeyRef.current = item.key;
    // }
  };

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
        {isError ? (
          <Result
            status='error'
            icon={<i className={'ri-alert-fill ri-3x'} />}
            subTitle={t('layout.menu_error_message')}
            extra={[
              <Box>
                <Button type={'link'} onClick={handleMenuTryAgain}>
                  {t('button.retry')}
                </Button>
              </Box>,
            ]}
          ></Result>
        ) : (
          <>
            <div
              className={showSider ? 'menu-search-input-container' : 'menu-search-input-container search-hide'}
              onClick={() => setShowSider(true)}
            >
              {showSider ? (
                <Input
                  placeholder={`${t('field.search')}`}
                  onChange={handleSearchChange}
                  prefix={<i className={'ri-search-line'} />}
                  size='small'
                />
              ) : (
                <i className='ri-search-2-line'></i>
              )}
            </div>

            {isLoading ? (
              <div className='menu-spin-container'>
                <Loading height='100%' containerProps={{ paddingTop: '4rem' }} />
              </div>
            ) : (
              <>
                <Menu
                  mode='inline'
                  openKeys={openKeys}
                  defaultSelectedKeys={menuSelectedKeys}
                  selectedKeys={menuSelectedKeys}
                  onOpenChange={(newOpenKeys: string[]) => setOpenKeys(newOpenKeys)}
                  items={filteredMenuItems}
                  getPopupContainer={(node) => node.parentNode as HTMLElement}
                  onClick={handleMenuClick}
                />
                {data && !filteredMenuItems && <Empty style={{ marginTop: '6rem' }} description={false}></Empty>}
              </>
            )}
          </>
        )}
      </S.MenuWrapper>
    );
  }

  function getMenuContainer() {
    return (
      <S.SiderItemsWrapper>
        <UserSection />
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
