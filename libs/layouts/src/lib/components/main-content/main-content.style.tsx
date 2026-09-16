import styled from 'styled-components';
import { Layout } from 'antd';
import { cssVar, respondTo } from '@branch-services/utils';

const { Content } = Layout;

export const MainContentContainer = styled(Content)`
  display: flex;
  height: 100%;
  //padding: 3.6rem 5rem;
  margin: var(${cssVar.verticalGap}) 0;
  margin-left: calc(var(${cssVar.drawerSideGap}));
  margin-right: calc(1 * var(${cssVar.drawerSideGap}));
  //margin-top: 0.6rem;
  //background-color: ${(props) => props.theme.base.background};

  ${respondTo.down('md')} {
    margin-left: var(${cssVar.drawerSideGap});
    margin: 0;
  }
`;
