import styled from 'styled-components';
import { Modal } from 'antd';

export const ModalWrapper = styled(Modal)`
  .modal-wrapper__header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 0.8rem;

    .ri-error-warning-fill {
      font-size: 2.4rem;
      color: ${(p) => p.theme.warning};
    }
  }

  .modal-wrapper__title {
    font-size: 1.6rem;
    font-weight: 500;
    margin: 0;
  }

  .modal-wrapper__body {
    padding: 0.8rem 0 2.8rem;
  }
`;
