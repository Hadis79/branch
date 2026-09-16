'use client';

import React, { useEffect } from 'react';
import { LocalStorageKey, WidgetHeaderType } from '@branch-services/types';
import * as S from './widget-wrapper.style';
import { useTr } from '@branch-services/translation';
import Breadcrumb from '../breadcrumb/breadcrumb';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { activeBackBtnOnPathname } from '../../utils/consts';
import { useResponsive } from '@branch-services/hooks';
import { storage } from '@branch-services/utils';
import { useWidgetStore } from '../../store';

export type WidgetWrapperProps = {
  headerTitle?: WidgetHeaderType['title'];
  // headerMessage?: WidgetHeaderType['message'];
  headerIcon?: WidgetHeaderType['icon'];
  headerAction?: React.ReactNode;
  children?: React.ReactNode;
  padding?: string;
  overflow_x?: React.CSSProperties['overflowX'];
  isDetailsPageTitleVisible?: boolean;
  showHeaderSection?: boolean;
  activeWithdrawalType?: string | null;
};

export const WidgetWrapper = (props: WidgetWrapperProps) => {
  const [t] = useTr();
  const router = useRouter();
  const currentPathname = usePathname();
  const { resetActiveWithdrawalType, setActiveWithdrawalType } = useWidgetStore((state) => state);
  const searchParams = useSearchParams();
  const step = searchParams.get('step');
  const {
    headerTitle,
    headerIcon,
    headerAction,
    isDetailsPageTitleVisible = false,
    showHeaderSection = true,
    activeWithdrawalType,
  } = props;
  const { isMobileOrTablet } = useResponsive();
  const { padding = '2.4rem', overflow_x = 'scroll' } = props;

  useEffect(() => {
    setActiveWithdrawalType(activeWithdrawalType);
    return resetActiveWithdrawalType;
  }, [activeWithdrawalType]);
  return (
    <S.WidgetWrapper>
      {showHeaderSection && !isMobileOrTablet && (
        <S.HeaderContainer>
          <S.Header>
            <S.HeaderTitleContainer>
              <S.HeaderTitleRow>
                <S.HeaderTitleGroup>
                  {headerIcon && <S.HeaderIcon>{headerIcon}</S.HeaderIcon>}
                  <strong>
                    {(isDetailsPageTitleVisible && step === activeBackBtnOnPathname?.searchParamValues?.[0]) ||
                    activeBackBtnOnPathname?.pathnames?.includes(currentPathname)
                      ? t('file_details')
                      : t(`${headerTitle}`)}{' '}
                    {activeWithdrawalType && t(`-`)} {activeWithdrawalType && t(`${activeWithdrawalType}`)}
                  </strong>
                </S.HeaderTitleGroup>
                {headerAction && <S.HeaderAction>{headerAction}</S.HeaderAction>}
              </S.HeaderTitleRow>
              <Breadcrumb
                onBack={() => router.back()}
                activeOnPathname={activeBackBtnOnPathname}
                headerTitle={headerTitle as string}
              />
            </S.HeaderTitleContainer>
          </S.Header>
        </S.HeaderContainer>
      )}

      <S.BodyContainer $padding={padding} overflow_x={overflow_x}>
        {props.children}
      </S.BodyContainer>
    </S.WidgetWrapper>
  );
};

// export default WidgetWrapper;
