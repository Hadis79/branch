import styled from 'styled-components';
import { Modal } from 'antd';
import { Button } from '@branch-services/ui-kit';

export const ModalWrapper = styled(Modal)`
  .ant-modal {
    width: 46rem;
  }

  .ant-modal-title {
    line-height: unset;
  }

  .ant-btn-variant-outlined {
    border-color: ${(p) => p.theme.primary};
    color: ${(p) => p.theme.primary};
  }
  .modal-wrapper__content {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    /* margin-bottom: 2.4rem; */
  }

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
  }

  .modal-wrapper__transaction {
    font-weight: 500;
    font-size: 1.4rem;

    .transaction-amount {
      padding-inline-start: 0.8rem;
    }
  }

  .ant-modal-footer {
    display: flex;

    button {
      width: 100%;
    }
  }

  .agent-remove-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    background: ${(p) => p.theme.backgroundLight};
    padding: 1.6rem;
    border-radius: 0.8rem;
  }
`;

export const RemoveButton = styled(Button)`
  background: ${(p) => p.theme.error};
`;
