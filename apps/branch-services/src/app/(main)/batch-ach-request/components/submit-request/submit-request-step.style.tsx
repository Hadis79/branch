import { respondTo } from '@branch-services/utils';
import styled, { css } from 'styled-components';
import { withdrawalTypesEnum } from '../../utils/types';

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
  height: 100%;
`;
export const SubmitWrapper = styled.div`
  display: grid;
  grid-template-columns: 48% 52%;
  justify-content: space-between;
  margin-top: 4rem;

  ${respondTo.down('xl')} {
    grid-template-columns: 1fr;
  }

  .account__owner-name-text {
    display: flex;
    gap: 0.4rem;
    font-size: 1.2rem;
    color: ${(p) => p.theme.textPrimary};
    font-weight: 300;
    margin-top: 0.4rem;
  }
`;

export const ImageWrapper = styled.div<{ activeWithdrawalType: withdrawalTypesEnum | null }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${(p) =>
    p.activeWithdrawalType === withdrawalTypesEnum.CHEQUE_METHOD &&
    css`
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
    `}
  ${respondTo.down('xl')} {
    display: none;
  }

  .transfer-by-cheque-description {
    max-width: 30rem;
    text-align: justify;
  }
`;
export const SoulWrapper = styled.div`
  display: flex;
  height: 75vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .not-access {
    font-size: 1.8rem;
    font-weight: 700;
  }

  .not-access__info {
    font-size: 1.6rem;
    font-weight: 500;
  }
`;
