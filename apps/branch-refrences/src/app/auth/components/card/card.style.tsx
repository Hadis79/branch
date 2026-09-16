import styled from 'styled-components';
import { respondTo } from '@branch-services/utils';

export const CodeInputs = styled.div`
  display: flex;
  gap: 1rem;

  input {
    width: 6.44rem;
    height: 6.44rem;
    text-align: center;
    font-size: 2rem;
    border-radius: 0.8rem;
    border: 0.1rem solid #ccc;

    &:focus {
      outline: none;
      border: 0.2rem solid ${(p) => p.theme.borderFocus};
    }
  }
`;

export const ButtonOtp = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  width: -webkit-fill-available;
  .button {
    height: 4.8rem;
  }
`;

export const OtpInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  align-items: center;
`;

export const SubmitWrapper = styled.div`
  margin-top: 3.2rem;

  /* ${respondTo.down('xl')} {
    grid-template-columns: 1fr;
  } */

  .ant-form-item {
    margin-bottom: 3.2rem;
  }

  ${respondTo.down('md')} {
    .ant-select-selection-item {
      font-size: 1.5rem;
    }
  }

  .account__owner-name-text {
    display: flex;
    gap: 0.4rem;
    font-size: 1.2rem;
    color: ${(p) => p.theme.textPrimary};
    font-weight: 300;
    margin-top: 0.4rem;
  }

  .password {
    display: flex;
    gap: 1.6rem;
    .password-button {
      border-color: ${(p) => p.theme.primary};
      color: ${(p) => p.theme.primary};
      min-width: 13.8rem;
    }
  }
`;
