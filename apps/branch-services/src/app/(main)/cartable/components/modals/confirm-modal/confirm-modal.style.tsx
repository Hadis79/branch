import styled from 'styled-components';

export const ConfirmModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  .transaction_balance {
    margin-bottom: 1rem;
    color: ${(p) => p.theme.primary};
    font-weight: 500;
  }

  & .ant-form-item-label {
    padding-bottom: 0 !important;
  }
  .transaction-amount {
    color: ${(p) => p.theme.primary};
    font-weight: 500;
    margin-left: 2rem;
  }
`;
