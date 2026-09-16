import React from 'react';
import type { FallbackProps } from 'react-error-boundary';

import { useTr } from '@branch-services/translation';

import * as S from './error-fallback.style';

const ErrorFallback: React.FC<FallbackProps> = (props) => {
  const { error } = props;

  const [t] = useTr();

  return (
    <S.ErrorFallbackWrapper>
      <S.ErrorTitle>{t('error.unspecific')}</S.ErrorTitle>
      <S.ErrorDetail>{error.message}</S.ErrorDetail>
    </S.ErrorFallbackWrapper>
  );
};

export default ErrorFallback;
