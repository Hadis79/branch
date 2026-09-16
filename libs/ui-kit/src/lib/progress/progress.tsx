import React from 'react';
import * as S from './progress.style';
import { ProgressProps as AntProgressProps } from 'antd';
import { ProgressBarWrapper, ProgressStyled } from './progress.style';
import { useAppTheme } from '@branch-services/hooks';

type ProgressProps = AntProgressProps & {
  title?: string;
  spaceTop?: string;
};

export const Progress = (props: ProgressProps) => {
  const theme = useAppTheme();
  const {
    format,
    percent,
    title,
    spaceTop = '2.4rem',
    strokeLinecap = 'round',
    strokeColor = theme.primary,
    trailColor = theme.surface,
    ...rest
  } = props;

  const customFormat = (percent?: number, successPercent?: number) => (
    <S.ProgressBarLabel>
      {`${percent}%`} {title && <span>{title}</span>}
    </S.ProgressBarLabel>
  );

  return (
    <ProgressBarWrapper spaceTop={spaceTop}>
      <ProgressStyled
        format={format || customFormat}
        percent={percent}
        strokeColor={strokeColor}
        strokeLinecap={strokeLinecap}
        trailColor={trailColor}
        {...rest}
      />
    </ProgressBarWrapper>
  );
};
