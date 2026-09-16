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

  ${respondTo.down('md')} {
    .ant-input-lg {
      font-size: 1.5rem !important;
    }
    .ant-select-selector {
      font-size: 1.75rem !important;
    }
  }

  ${respondTo.down('xl')} {
    grid-template-columns: 1fr;
  }

  .tooltip-info {
    display: flex;
  }

  .account__owner-name-text {
    display: flex;
    gap: 0.4rem;
    font-size: 1.2rem;
    color: ${(p) => p.theme.textPrimary};
    font-weight: 300;
    margin-top: 0.4rem;
  }

  .inquiry-checkbox {
    width: auto;
  }

  .text_check_box {
    display: flex;
    align-items: center;
    font-size: 1.4rem;
    font-weight: normal;
    gap: 0.4rem;
    ${respondTo.down('md')} {
      font-size: 1.5rem !important;
      margin-top: 1rem;
    }
    svg {
      width: auto;
    }
  }

  .tooltip {
    padding: 1.6rem;
  }

  .inquiry {
    gap: 1rem !important;
  }
`;

export const DownloadFile = styled.div`
  margin-top: 4rem;
  display: flex;
  justify-content: space-between;
  padding: 1.2rem 2.4rem;
  border-radius: 0.8rem;
  background-color: ${(props) => props.theme.cardColor};
  .text {
    align-content: center;
  }
  .text-svg {
    display: flex;
    column-gap: 0.4rem;
  }
  .ant-btn {
    display: flex;
    flex-direction: row;
  }
  ${respondTo.down('md')} {
    margin-top: 0;
    flex-direction: column;
    row-gap: 0.4rem;
    font-size: 1.5rem;
    padding: 1.5rem 2rem;
    .text-svg > svg:first-child {
      width: 2.5rem;
      height: 2.5rem;
    }
    .ant-btn {
      font-size: 1.5rem;
      width: fit-content;
    }
    .ant-btn-icon {
      .ri-download-line {
        font-size: 1.5rem;
      }
    }
  }
`;

export const intermediaryAccountData = styled.div`
  margin-top: 1.6rem;
  display: flex;
  justify-content: space-between;
  padding: 1.2rem 2.4rem;
  border-radius: 0.8rem;
  background-color: ${(props) => props.theme.cardColor};
  .text {
    align-content: center;
  }
  .text-svg {
    display: flex;
    column-gap: 0.4rem;
  }
  .ant-btn {
    display: flex;
    flex-direction: row;
  }
  ${respondTo.down('md')} {
    margin-top: 2rem;
    flex-direction: column;
    row-gap: 0.4rem;
    font-size: 1.5rem;
    padding: 1.5rem 2rem;
    .text-svg > svg:first-child {
      width: 2.5rem;
      height: 2.5rem;
    }
    .ant-btn {
      font-size: 1.5rem;
      width: fit-content;
    }
    .ant-btn-icon {
      .ri-download-line {
        font-size: 1.5rem;
      }
    }
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
    .list {
      list-style: disc;
    }
  }
`;
