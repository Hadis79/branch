import { Tabs } from 'antd';
import styled from 'styled-components';
import { respondTo } from '@branch-services/utils';

export const StyledTabs = styled(Tabs)`
  .ant-tabs-nav-list {
    width: 100%;
    display: grid !important;
    grid-template-columns: repeat(2, 1fr);
  }
  .ant-tabs-tab {
    text-align: center;
    display: block;
    margin: 0 !important;
    // flex-grow: 1;
  }
  .custom-tab-bar-extra-content {
    flex: 1; /* Make the extra content div take up the remaining space */
  }
  .ant-tabs-nav {
    margin-bottom: 2.4rem;
    ${respondTo.down('lg')} {
      margin: 0 0 4rem;
    }
  }
`;

export const SelectedOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
`;

export const SelectedOption = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.6rem 0.8rem;
  color: ${(props) => props.theme.textSecondary};
  background: ${(props) => props.theme.backgroundLight};
  border-radius: 0.4rem;

  button {
    display: inline-flex;
    padding: 0;
    color: inherit;
    background: transparent;
    border: 0;
    cursor: pointer;
  }
`;
