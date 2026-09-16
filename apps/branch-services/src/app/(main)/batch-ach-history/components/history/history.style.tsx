import styled from 'styled-components';
import { respondTo } from '@branch-services/utils';

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
    cursor: pointer;
  }
`;

export const HasIbanInquiry = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  gap: 0.5rem;

  .has {
  }

  .does_not_have {
  }
`;
export const Icon = styled.div`
  display: flex;

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const Done = styled.div`
  .done {
    display: flex;
    justify-content: ${(p) => (p.theme.direction === 'rtl' ? 'flex-end' : 'flex-start')};
    gap: 0.4rem;
    color: ${(props) => props.theme.success};
    font-weight: 500;
  }

  .info {
    color: ${(props) => props.theme.primary};
    justify-content: ${(p) => (p.theme.direction === 'rtl' ? 'flex-end' : 'flex-start')};
    display: flex;
    gap: 0.4rem;
    font-weight: 500;
  }

  .not-done {
    display: flex;
    align-items: center;
    justify-content: ${(p) => (p.theme.direction === 'rtl' ? 'flex-end' : 'flex-start')};
    gap: 0.4rem;
  }

  svg {
    width: 2rem;
    height: 2rem;
  }

  ${respondTo.down('md')} {
    svg {
      width: 2.25rem;
      height: 2.25rem;
    }
  }
`;
export const DepositIntermediaryAccount = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  gap: 0.5rem;

  .deposit {
    color: ${(p) => p.theme.success};
  }

  .not_deposited {
    color: ${(p) => p.theme.error};
  }
`;
export const ErrorText = styled.div`
  display: flex;
  align-items: start;
  justify-content: left;
  gap: 0.5rem;

  .error_text {
    color: ${(p) => p.theme.error};
  }
`;
