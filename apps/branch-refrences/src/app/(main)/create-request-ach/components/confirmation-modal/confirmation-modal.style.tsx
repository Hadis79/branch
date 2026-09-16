import { Modal } from 'antd';
import styled from 'styled-components';

export const ModalWrapper = styled(Modal)`
  width: 57rem !important;
  .ant-modal {
    width: 46rem;
  }

  .modal-wrapper__content {
    display: flex;
    flex-direction: column;
    gap: 2.2rem;
    /* margin-bottom: 2.4rem; */
  }

  .modal-wrapper__amount {
    display: flex;
    flex-direction: column;
    gap: 1rem !important;
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
    margin: 0;
  }

  .modal-wrapper__transaction {
    font-weight: 600;
    font-size: 1.6rem;
    .transaction-amount {
      padding-inline-start: 0.8rem;
    }
  }

  .confirm_footer {
    margin-top: 4rem;

    .button_reject {
      width: 50%;
      border-color: ${(p) => p.theme.primary};
      font-size: 1.4rem;
      color: ${(p) => p.theme.primary};
    }

    .button_continue {
      width: 50%;
      font-size: 1.4rem;
    }
  }
`;

export const ModalWrapperPwa = styled.div`
  .ant-modal {
    width: 46rem;
  }

  .modal-wrapper__content {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    /* margin-bottom: 2.4rem; */
  }

  .modal-wrapper__amount {
    display: flex;
    flex-direction: column;
    gap: 1.25rem !important;
  }

  .modal-wrapper__header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 0.8rem;

    .ri-error-warning-fill {
      font-size: 3rem;
      color: ${(p) => p.theme.warning};
    }
  }

  .modal-wrapper__title {
    font-size: 2rem;
    font-weight: 500;
    margin: 0;
  }

  .modal-wrapper__transaction {
    font-weight: 600;
    font-size: 2rem;
    .transaction-amount {
      padding-inline-start: 0.8rem;
    }
  }

  .confirm_footer {
    margin-top: 5rem;

    .button_reject {
      width: 50%;
      border-color: ${(p) => p.theme.primary};
      font-size: 1.75rem;
      color: ${(p) => p.theme.primary};
    }

    .button_continue {
      width: 50%;
      font-size: 1.75rem;
    }
  }
`;
