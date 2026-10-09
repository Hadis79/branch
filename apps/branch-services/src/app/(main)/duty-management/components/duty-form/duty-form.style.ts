import styled from 'styled-components';
import { Tabs } from 'antd';

import { MessageBox } from '@branch-services/ui-kit';

// The guide banner is neutral gray in the design, not the blue of an info alert
// `&&` outranks antd's own alert rules, which otherwise size and place the two icons differently
export const InfoMessage = styled(MessageBox)`
  && {
    padding: 1.2rem 1.6rem;
    align-items: flex-start;
    border: 1px solid ${(props) => props.theme.iconPrimary};
    border-radius: 0.6rem;
    background-color: ${(props) => props.theme.backgroundLight};
  }

  /* Both icons sit in a box one text line tall, so they line up with each other and the first line */
  && .ant-alert-icon,
  && .ant-alert-close-icon {
    height: 2.4rem;
    margin-block: 0;
    padding: 0;
    display: flex;
    align-items: center;
    font-size: 1.8rem;
    line-height: 1;
  }

  && .ant-alert-icon {
    margin-inline-end: 0.8rem;
    color: ${(props) => props.theme.secondary};
  }

  && .ant-alert-close-icon {
    margin-inline-start: 1.6rem;

    .anticon {
      font-size: 1.8rem;
      color: ${(props) => props.theme.textPrimary};
    }
  }

  && .ant-alert-message {
    margin-bottom: 0;
    color: ${(props) => props.theme.textPrimary};
    font-weight: 400;
    line-height: 2.4rem;
  }
`;

// Label on the start edge, value pushed to the end edge
export const PreviewRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.6rem;
  font-size: 1.2rem;
  line-height: 2rem;

  .preview-label {
    color: ${(props) => props.theme.textSecondary};
  }

  .preview-value {
    color: ${(props) => props.theme.textPrimary};
    font-weight: 500;
    text-align: end;
  }
`;

// The group / unit tabs and the picker under them, framed together
export const TargetBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: 0 1.6rem 1.6rem;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 0.8rem;
`;

// Two tabs sharing the full width, with no panes: the picker under them follows the active tab
export const TargetTabs = styled(Tabs)`
  .ant-tabs-nav {
    margin: 0;
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

export const ViewLink = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0;
  border: 0;
  background: none;
  color: ${(props) => props.theme.primary};
  font: inherit;
  font-weight: 500;
  cursor: pointer;

  i {
    font-size: 1.6rem;
  }
`;
