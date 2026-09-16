import React from 'react';

import * as S from './table.style';

export type MobileColumnProps = {
  title?: React.ReactNode;
  value?: React.ReactNode;
};

export const MobileColumn = (props: MobileColumnProps) => {
  const { title, value } = props;

  return (
    <S.MobileColumnWrapper>
      <span className={'item__title'}>{title}</span>
      <span className={'item__value'}>{value}</span>
    </S.MobileColumnWrapper>
  );
};
