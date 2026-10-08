import styled from 'styled-components';
import { Tabs } from 'antd';

// Two tabs sharing the full width
export const CreateTabs = styled(Tabs)`
  .ant-tabs-nav {
    margin: 2.4rem 3.2rem 0;
  }

  .ant-tabs-nav-list {
    display: grid !important;
    grid-template-columns: repeat(2, 1fr);
    width: 100%;
  }

  .ant-tabs-tab {
    justify-content: center;
    margin: 0 !important;
  }
`;
