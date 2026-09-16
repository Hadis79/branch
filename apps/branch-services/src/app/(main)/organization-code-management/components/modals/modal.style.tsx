import styled from 'styled-components';
import { Modal } from 'antd';

export const ModalWrapper = styled(Modal)`
  .ant-modal-title {
    line-height: 1.8;
  }

  .ant-modal-body {
  }

  .ant-form-item:last-of-type {
    margin-bottom: 0;
  }

  .organization-code-input {
    .ant-input-suffix {
      margin-inline-start: 0.8rem;
    }

    .organization-code-inquiry {
      min-width: 4.8rem;
      height: auto;
      padding: 0;
      font-size: 1.2rem;
    }
  }
`;

export const ModalTitle = styled.div<{ $danger?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.6rem;
  font-weight: 500;

  i {
    color: ${(props) => (props.$danger ? props.theme.error : props.theme.primary)};
    font-size: 2.2rem;
  }
`;

export const ModalDescription = styled.p`
  margin: 0 0 1.6rem;
  color: ${(props) => props.theme.textPrimary};
`;

export const ModalActions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.6rem;
  margin-top: 2.4rem;

  button {
    width: 100%;
  }
`;
