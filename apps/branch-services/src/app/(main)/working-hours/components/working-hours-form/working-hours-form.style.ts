import styled from 'styled-components';

import { MessageBox } from '@branch-services/ui-kit';

export const Days = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const DaysTitle = styled.div`
  color: ${(props) => props.theme.textPrimary};
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 2rem;
`;

// The guide banner is neutral gray in the design, not the blue of an info alert
export const GuideMessageBox = styled(MessageBox)`
  background-color: ${(props) => props.theme.backgroundLight};
  border-color: ${(props) => props.theme.border};

  .ant-alert-icon,
  .ant-alert-close-icon {
    color: ${(props) => props.theme.textPrimary};
  }
`;

// The weekday cards scroll inside a fixed height instead of stretching the whole page
export const DaysList = styled.div`
  max-height: 40rem;
  overflow-y: auto;
  padding-inline-end: 0.4rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;
