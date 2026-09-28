import styled from 'styled-components';

import { MessageBox } from '@branch-services/ui-kit';

export const InfoMessage = styled(MessageBox)`
  min-height: 7.2rem;
  padding: 1.2rem 1.6rem;
  align-items: center;
  border: 1px solid ${(props) => props.theme.iconPrimary};
  border-radius: 0.6rem;
  background-color: ${(props) => props.theme.backgroundLight};

  .ant-alert-icon {
    align-self: flex-start;
    color: ${(props) => props.theme.secondary} !important;
    font-size: 1.8rem;
  }

  .ant-alert-content {
    justify-content: center;
  }

  .ant-alert-message {
    color: ${(props) => props.theme.textPrimary};
    font-weight: 400;
    line-height: 2.4rem;
  }

  .ant-alert-close-icon {
    align-self: flex-start;
    padding-top: 0;
    color: ${(props) => props.theme.textPrimary};
    font-size: 1.8rem;
  }
`;
