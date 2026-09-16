import React, { useEffect, useState } from 'react';
import { Tooltip } from 'antd';

import { Locale } from '@branch-services/types';
import { useClientSsn, useConfig, useResponsive, useUserRefrencesQuery, useUserStore } from '@branch-services/hooks';
import { Button, Loading } from '@branch-services/ui-kit';
import { useTr } from '@branch-services/translation';

import { Api } from '../../services';

import * as S from './user-section.style';
import { persianToFinglish } from '@branch-services/utils';

import { ReactComponent as ArrowLeft } from '../../assets/media/toggle-arrow-left.svg';
import { ReactComponent as ArrowRight } from '../../assets/media/toggle-arrow-right.svg';
import Image from 'next/image';

export type DrawerProps = {
  onToggleDrawer?: React.MouseEventHandler;
  children?: React.ReactNode;
  onBreakpoint?: (broken: boolean) => void;
  onClose?: () => void;
  showSider?: boolean;
  setShowSider?: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserSection = (props: DrawerProps) => {
  const { showSider, setShowSider } = props;
  const { isMobileOrTablet } = useResponsive();
  const { user, userPhoto, setUserPhoto, message, resetMessage } = useUserStore();
  const { isLoading, refetch: refetchUser } = useUserRefrencesQuery();
  const clientSsn = useClientSsn();

  const handleRefetchUser = () => {
    resetMessage();
    refetchUser();
  };

  useEffect(() => {
    if (user) {
      resetMessage();
    }
  }, [user?.userInfo?.name]);

  const [t] = useTr();
  const { config } = useConfig();

  useEffect(() => {
    if (userPhoto) {
      return;
    }

    Api.getUserPhoto()
      .then((res) => {
        if (res?.photo) {
          setUserPhoto(`data:image/png;base64,${res?.photo}`);
        }
      })
      .catch((err) => {
        console.error('getUserPhoto err', err);
      });
    // .finally(() => {});
  }, []);

  const isFaLocale = (config) => {
    return config.locale === Locale.FA_IR;
  };

  const getUserFullName = () => {
    if (!user) {
      return '-';
    }
    const persianFullName = `${user?.name}`;

    const englishFullName = `${user?.userInfo?.english_name} ${user?.userInfo?.english_family}`;
    const userFullName = isFaLocale(config) ? persianFullName : englishFullName;
    const open = userFullName?.length < 30 ? false : undefined;
    return (
      <Tooltip title={userFullName} placement={'top'} open={open} mouseEnterDelay={1}>
        {userFullName}
      </Tooltip>
    );
  };

  const getOrgTitle = () => {
    // const orgTitle = isFaLocale(config) ? user?.jobInfo?.job_name : persianToFinglish(user?.jobInfo?.job_name);
    const organizations = user?.organizations;
    const orgName = organizations?.find((e) => e?.orgSsn === clientSsn);

    const tooltip = (
      <>
        <div>{orgName?.orgName}</div>
        <div>
          {t('field.org_ssn')} : {clientSsn}
        </div>
      </>
    );
    return (
      <Tooltip title={tooltip} placement={'bottom'} /*open={open}*/ mouseEnterDelay={0.5}>
        {orgName?.orgName}
      </Tooltip>
    );
  };

  return (
    <S.UserProfileWrapper showSider={showSider}>
      <section
        className={
          !isMobileOrTablet ? (showSider ? 'user-section' : 'user-section hide-section') : 'user-section-mobile'
        }
      >
        {!isMobileOrTablet && (
          <S.ToggleButton showSider={showSider} onClick={() => setShowSider?.((prev) => !prev)}>
            <div className='toggle-icon'>{showSider ? <ArrowRight /> : <ArrowLeft />}</div>
          </S.ToggleButton>
        )}
        <div className='user-section__top-row'>
          <div className={'user-avatar-container'}>
            <Image src={'/assets/user-icon.svg'} alt='' width={60} height={60} />
          </div>
          <div className='user-info'>
            {isLoading ? (
              <Loading />
            ) : message ? (
              <div className='user_error_state'>
                <span className='error_text'>{t(message.txt)}</span>
                <Button type='text' icon={<i className='ri-refresh-line'></i>} onClick={handleRefetchUser}>
                  {t('button.retry')}
                </Button>
              </div>
            ) : (
              <>
                <div className='user-profile-name'>{getUserFullName()}</div>
                <span className='user-organization-title'>{getOrgTitle() || '_'}</span>
                <span className='user-branch-info'></span>
              </>
            )}
          </div>
          <div className='divider'></div>
        </div>
      </section>
    </S.UserProfileWrapper>
  );
};

export default UserSection;
