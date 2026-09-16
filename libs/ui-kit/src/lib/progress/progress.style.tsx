import styled from 'styled-components';
import { Progress as AntProgress } from 'antd';

export const ProgressStyled = styled(AntProgress)`
  //
`;
export const ProgressBarWrapper = styled.div<{ spaceTop: string }>`
  position: relative;
  top: ${(p) => p.spaceTop};
  width: 100%;

  .ant-progress.ant-progress-show-info .ant-progress-outer {
    padding-inline-end: 0 !important;
  }
`;
export const ProgressBarLabel = styled.div`
  position: absolute;
  top: -18px;
  right: 0;
  width: 100%;
  color: ${(props) => props.theme.primary};
  font-weight: 700;
  font-size: 1.6rem;
`;
