'use client';

import React from 'react';
import { WidgetHeaderType } from '@branch-services/types';
import * as S from './widget-wrapper-mobile.style';
import { useTr } from '@branch-services/translation';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { activeBackBtnOnPathname } from '../../utils/consts';
import { useWidgetStore } from '../../store';

export type WidgetWrapperProps = {
  headerTitle?: WidgetHeaderType['title'];
  // headerMessage?: WidgetHeaderType['message'];
  headerIcon?: WidgetHeaderType['icon'];
  children?: React.ReactNode;
  padding?: string;
  overflow_x?: React.CSSProperties['overflowX'];
  isDetailsPageTitleVisible?: boolean;
  showHeaderSection?: boolean;
};

export const WidgetWrapperMobile = (props: WidgetWrapperProps) => {
  const [t] = useTr();
  const router = useRouter();
  const currentPathname = usePathname();
  const { activeWithdrawalType } = useWidgetStore((state) => state);

  const searchParams = useSearchParams();
  const step = searchParams.get('step');
  const { headerTitle, isDetailsPageTitleVisible = false, showHeaderSection = true } = props;
  const { padding = '2.4rem', overflow_x = 'scroll' } = props;
  return (
    <div>
      {showHeaderSection && (
        <S.HeaderContainer>
          <S.Header>
            <S.HeaderTitleContainer>
              {currentPathname !== '/home' && <i onClick={() => router.back()} className='ri-arrow-right-line'></i>}
              <strong>
                {(isDetailsPageTitleVisible && step === activeBackBtnOnPathname.searchParamValues[0]) ||
                activeBackBtnOnPathname?.pathnames?.includes(currentPathname)
                  ? t('file_details')
                  : t(`${headerTitle}`)}{' '}
                {activeWithdrawalType && t(`-`)} {activeWithdrawalType && t(`${activeWithdrawalType}`)}
              </strong>
            </S.HeaderTitleContainer>
          </S.Header>
        </S.HeaderContainer>
      )}
    </div>
  );
};

// export default WidgetWrapperMobile;
