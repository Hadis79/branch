import styled from 'styled-components';
import { Alert } from '../alert/alert';
import { respondTo } from '@branch-services/utils';

export const StyledContainer = styled(Alert)`
  padding-top: 1rem;
  padding-bottom: 1rem;

  .ant-alert-message {
    margin-bottom: 0;
    font-size: 1.4rem;
  }
  ${respondTo.down('md')} {
    .ant-alert-message {
      font-size: 1.75rem;
    }

    .message-box__link {
      font-size: 1.75rem !important;
    }

    .message-box__sub-errors {
      .message-box__sub-error-item {
        font-size: 1.5rem !important;
      }
    }
  }

  .ant-alert-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .ant-alert-description {
    display: flex;
    flex-direction: column;
  }

  .ant-alert-close-icon {
    padding-top: 0.5rem;
  }

  .message-box__link {
    margin-top: 0.5rem;
    display: flex;
    font-size: 1.4rem;
    font-weight: 500;
    color: ${(p) => {
      switch (p.type) {
        case 'success':
          return p.theme.success;
        case 'error':
          return p.theme.error;
        case 'warning':
          return p.theme.warning;
        case 'info':
          return p.theme.info;
        default:
          return 'inherit';
      }
    }} !important;
  }

  .message-box__sub-errors {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    max-height: 13rem;
    overflow-y: hidden;
    transition: max-height 0.5s ease-out;
    padding-inline-start: 0;
    padding-inline-end: 0.3rem;

    .message-box__sub-error-item {
      font-size: 1.2rem;
      list-style-position: inside;
    }
  }

  .message-box__sub-errors.expanded {
    max-height: 20rem;
    overflow-y: auto;
  }
`;

export const ToggleButton = styled.button`
  color: ${({ theme }) => theme.primary};
  border: none;
  background: none;
  cursor: pointer;
  font-weight: 500;

  .message-box__toggle-btn-text {
    margin-inline-end: 0.4rem;
  }
`;
