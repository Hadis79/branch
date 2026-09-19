import styled from 'styled-components';
import { Tabs } from 'antd';

// Two tabs sharing the full width
export const ListTabs = styled(Tabs)`
  .ant-tabs-nav {
    margin: 0 3.2rem;
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
