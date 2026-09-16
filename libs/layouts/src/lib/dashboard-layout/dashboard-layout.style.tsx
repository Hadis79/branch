import styled from 'styled-components';
import { Layout } from 'antd';

import { cssVar } from '@branch-services/utils';
import { Direction } from '@branch-services/types';

export const MainContentLayout = styled(Layout)`
  /* margin-left: var(${cssVar.mainContentMargin}); */
  //margin-left: ${(p) => (p.theme.direction === Direction.RTL ? 0 : `var(${cssVar.mainContentMargin})`)};
  //  margin-right: ${(p) => (p.theme.direction === Direction.LTR ? 0 : `var(${cssVar.mainContentMargin})`)};
  //background-color:  ${(p) => p.theme.background};
`;
