import styled from 'styled-components';
import { respondTo } from '@branch-services/utils';
import { Form } from 'antd';

export const FinalFormWrapper = styled(Form)`
  padding-top: 1.6rem;

  .payment_id {
    padding-left: 0.5rem;
    color: ${(p) => p.theme.primary};
    font-size: 1.6rem;
  }
`;

export const FinalConfirmationStyle = styled.div`
  .final-confirmation__container {
    display: grid;
    grid-template-columns: 25% 75%;
    grid-row-gap: 1.6rem;

    ${respondTo.down('lg')} {
      grid-template-columns: 40% 60%;
    }

    .info-header {
      display: grid;
      grid-template-columns: max-content auto;
      font-size: 1.4rem;
      font-weight: bold;
      color: ${(p) => p.theme.textSecondary};
      grid-column: 1/-1;

      .line {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-left: 1.6rem;

        > span {
          display: block;
          width: 100%;
          border-top: 0.5px dotted gray;
        }
      }
    }

    .info-item__title {
      font-size: 1.4rem;
      font-weight: normal;
      color: ${(p) => p.theme.textSecondary};
    }

    .info-item__value {
      font-size: 1.4rem;
      font-weight: 500;
      color: ${(p) => p.theme.textSecondary};
    }

    .transaction_details_link {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      color: ${(p) => p.theme.primary};
      cursor: pointer;

      i {
        font-size: 2rem;
        color: ${(p) => p.theme.primary};
      }
    }
  }
`;

export const ActionButtonsContainer = styled.div`
  display: flex;
  gap: 0.8rem;
  justify-content: end;
  align-items: center;
  margin-top: 4.8rem;

  .previous-form__button {
    min-width: 12.2rem;
  }

  .new_request-form__button {
    font-size: 14px;
    min-width: 12.2rem;
    border-color: ${(p) => p.theme.secondary};
    color: ${(p) => p.theme.primary};
    margin-top: 0;
  }

  .cancel-form__button {
    width: 12.2rem;
    border-color: ${(p) => p.theme.primary};
    color: ${(p) => p.theme.primary};
  }

  .continue-form__button {
    min-width: 12.2rem;
  }

  .new_request-form-button {
    min-width: 12.2rem;
  }

  ${respondTo.down('md')} {
    .ant-btn {
      width: 100%;
    }
  }
`;
