import { Steps as AntSteps, StepsProps as AntStepsProps } from 'antd';

import * as S from './steps.style';

export type StepsProps = AntStepsProps & {
  //
};

export const Steps = (props: StepsProps) => {
  const { children, ...rest } = props;

  return (
    <S.SwitchWrapper>
      <AntSteps {...rest}>{children} </AntSteps>
    </S.SwitchWrapper>
  );
};
