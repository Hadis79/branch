import Link from 'next/link';
import styled from 'styled-components';
import { respondTo } from '@branch-services/utils';

export const LinkWrapper = styled(Link)`
  color: ${(p) => p.theme.primary};
  font-weight: 400;

  :hover {
    color: ${(p) => p.theme.textHoverColor} !important;
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
