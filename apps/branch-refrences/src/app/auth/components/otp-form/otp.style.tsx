import styled from 'styled-components';
import { respondTo } from '@branch-services/utils';

export const CodeInputs = styled.div`
  display: flex;
  gap: 1rem;

  input {
    width: 6.44rem;
    height: 6.44rem !important;
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

export const OtpContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
`;

export const Resend = styled.div`
  margin-top: 1rem;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  span {
    color: ${(p) => p.theme.borderFocus};
    cursor: pointer;
    font-weight: bold;
    margin-right: 0.4rem;
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
