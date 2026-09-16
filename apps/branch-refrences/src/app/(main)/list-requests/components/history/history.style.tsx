import styled from 'styled-components';

export const StatusWrapper = styled.div`
  &.status__success {
    color: ${(props) => props.theme.success};
  }

  &.status__failed {
    color: ${(props) => props.theme.textTeritory};
  }

  &.status__warning {
    color: ${(props) => props.theme.warning};
  }

  &.status__error {
    color: ${(props) => props.theme.error};
  }

  &.status__created {
    color: ${(props) => props.theme.info};
  }
`;

export const PaymentId = styled.div`
  .payment_id {
    padding-left: 0.5rem;
    color: ${(p) => p.theme.primary};
    font-size: 1.6rem;
  }
`;

export const MobileTableItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: 1.5rem;
  font-weight: bold;
  color: ${(props) => props.theme.textSecondary};

  margin-bottom: 1rem;

  .item__title {
    max-width: 15rem;
  }

  .item__value {
    font-weight: 400;
  }
`;
