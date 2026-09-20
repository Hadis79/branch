import styled from 'styled-components';

import { MessageBox } from '@branch-services/ui-kit';

// The guide banner is neutral gray in the design, not the blue of an info alert
export const GuideMessageBox = styled(MessageBox)`
  background-color: ${(props) => props.theme.backgroundLight};
  border-color: ${(props) => props.theme.border};

  .ant-alert-icon,
  .ant-alert-close-icon {
    color: ${(props) => props.theme.textPrimary};
  }
`;
