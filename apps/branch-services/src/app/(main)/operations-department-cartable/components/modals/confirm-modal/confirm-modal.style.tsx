import styled from 'styled-components';

export const ModalWrapper = styled.div`
  .ant-modal {
    width: 46rem;
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
      color: ${(p) => p.theme.primary};
    }
  }

  .modal-wrapper__title {
    font-size: 1.6rem;
    font-weight: 500;
    margin: 0;
  }

  .modal-wrapper__transaction {
    font-weight: 500;
    font-size: 1.4rem;
    color: ${(p) => p.theme.primary};

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
