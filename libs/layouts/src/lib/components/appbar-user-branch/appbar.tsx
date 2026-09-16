import React, { useEffect, useState } from 'react';

import { useTr } from '@branch-services/translation';
import { ENV_CONSTANTS, fullDateLocale } from '@branch-services/utils';
import { Locale } from '@branch-services/types';
import { BaamsunLogo, BottomSheet, Button, LocaleSwitcher, ThemeSwitch } from '@branch-services/ui-kit';

import * as S from './appbar.style';
import AppBarMenu from '../appbar-menu/appbar-menu';
import { useConfig, useUserStore } from '@branch-services/hooks';
import { ReactComponent as BankLogo } from './../../assets/media/meli-bank-logo.svg';
import { ReactComponent as UserAccount } from './../../assets/media/user-account 1.svg';
import { Space, Spin, Select } from 'antd';
import useOrganizationQuery from './organization-mutate-query';
import useDelagationQuery from './delegation-mutate-query';

export type AppBarProps = {
  isMobileOrTablet: boolean;
  onToggleDrawer?: React.MouseEventHandler;
  onLogout?: any;
  children?: React.ReactNode;
};

const Appbar = (props: AppBarProps) => {
  const { config } = useConfig();
  const { onToggleDrawer, isMobileOrTablet } = props;
  const [t] = useTr();
  const [organization, setOrganization] = useState('');
  const [organizationValue, setOrganizationValue] = useState('');
  const userSelectedRef = React.useRef(false);
  const { data, isLoading, isFetching } = useOrganizationQuery({ limit: 10 });
  const { user } = useUserStore();

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const { switchDelegation, isSwitching } = useDelagationQuery();
  const handleOpenBottomSheet = () => {
    setIsBottomSheetOpen(true);
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  const options = Array.isArray(data?.data)
    ? data?.data?.map((org: any) => ({
        value: org?.orgSsn ? org?.orgSsn : org?.userSsn,
        label: org?.orgName ? org?.orgName : org?.userName,
      }))
    : [];

  const onClose = () => {
    setIsBottomSheetOpen(false);
  };

  const requestDelegationSwitch = async (ssn: string) => {
    const result = await switchDelegation({ ssn });
    userSelectedRef.current = false;

    if (result.status === 'success') return;

    // Keep the selector aligned with the profile that is still authoritative
    // when the switch fails. A successful PUT with a failed profile fetch
    // clears user until the normal bootstrap obtains the server session.
    const current = options.find((item) => item.value === user?.clientSsn);
    setOrganization(current?.label ?? user?.name ?? '');
    setOrganizationValue(current?.value ?? user?.clientSsn ?? '');
  };

  const handleApply = () => {
    onClose();
  };

  const getMobileAppbar = () => {
    return (
      <>
        <Button shape={'circle'} type={'text'} className={'menu-toggle-wrapper'} onClick={onToggleDrawer}>
          <i className={'ri-menu-line'} />
          {/* {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} */}
        </Button>

        {/* <span className={'appbar-title-logo-date'}>{<BaamsunLogo />}</span> */}
        <Space style={{ paddingLeft: '2rem' }}>
          <Button
            style={{
              height: '4rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
            onClick={handleOpenBottomSheet}
          >
            <i className='ri-arrow-down-s-line' />
            {organization || user?.name}
          </Button>
        </Space>

        <BottomSheet open={isBottomSheetOpen} onClose={handleCloseBottomSheet} initialHeight={300} closable>
          <S.Container>
            <S.Title>{t('common.organizations')}</S.Title>

            {isLoading || isFetching ? (
              <S.SpinnerWrapper>
                <Spin />
              </S.SpinnerWrapper>
            ) : (
              <S.List>
                {options.map((item) => (
                  <S.Item
                    key={item.value}
                    $active={organizationValue === item.value}
                    onClick={() => {
                      setOrganization(item.label);
                      setOrganizationValue(item.value);
                      if (item.value !== user?.clientSsn) {
                        void requestDelegationSwitch(item.value);
                      }
                    }}
                  >
                    <S.Label>{item.label}</S.Label>
                    <S.Radio $active={organizationValue === item.value} />
                  </S.Item>
                ))}
              </S.List>
            )}

            <S.Footer>
              <Button type='default' block onClick={onClose}>
                {t('button.cancel')}
              </Button>
              <Button type='primary' block onClick={handleApply}>
                {t('button.confirm')}
              </Button>
            </S.Footer>
          </S.Container>
        </BottomSheet>
      </>
    );
  };

  useEffect(() => {
    if (!options.length) return;
    if (userSelectedRef?.current) return;

    const initialValue = user?.clientSsn;
    const current = options.find((e) => e.value === initialValue);

    if (current) {
      setOrganization(current?.label);
      setOrganizationValue(current?.value);
    }
  }, [options, user?.clientSsn]);

  const onSelect = (value, option) => {
    userSelectedRef.current = true;
    setOrganizationValue(value);

    const label = option?.label ?? options.find((o) => o.value === value)?.label;
    if (label) setOrganization(label);
    if (value !== user?.clientSsn) {
      void requestDelegationSwitch(value);
    }
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
          {options.length > 0 && (
            <Space style={{ paddingLeft: '2rem' }}>
              <Select
                style={{ width: '22rem', height: '4rem' }}
                // suffixIcon={<UserAccount />}
                className='organization'
                placement='bottomLeft'
                showSearch
                optionFilterProp='children'
                onSelect={onSelect}
                value={organizationValue}
                loading={isLoading || isSwitching}
                disabled={isSwitching}
                dropdownRender={(menu) => (
                  <>
                    <div style={{ maxHeight: 200, overflowY: 'auto' }}>
                      {isFetching ? <Spin style={{ margin: '10px 0' }} /> : menu}
                    </div>

                    {/* {data?.hasMore && (
                    <div style={{ textAlign: 'center', padding: 8 }}>
                      <Button size='small' onClick={() => setPage((p) => p + 1)} loading={isFetching}>
                        موارد بیشتر
                      </Button>
                    </div>
                  )} */}
                  </>
                )}
                options={options}
                placeholder={t('placeholder.organization')}
              />
            </Space>
          )}

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
              onClick={() => props.onLogout()}
            />
          </span>
        </div>
      </>
    );
  };

  return <S.AppBar>{isMobileOrTablet ? getMobileAppbar() : getDesktopAppbar()}</S.AppBar>;
};

export default Appbar;
