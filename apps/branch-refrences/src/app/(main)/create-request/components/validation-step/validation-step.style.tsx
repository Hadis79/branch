import styled from 'styled-components';
import { Box } from '@branch-services/ui-kit';
import { respondTo } from '@branch-services/utils';

export const Container = styled.div<{ isRequiry: boolean }>`
  margin-top: 1.6rem;
  width: 100%;
  /* height: ${({ isRequiry }) => (isRequiry ? 'calc(100vh - 10px)' : 'calc(100vh - 350px)')}; */
  border-radius: 0.8rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  /* ${respondTo.down('md')} {
    height: ${({ isRequiry }) => (isRequiry ? 'calc(100vh)' : 'calc(100vh - 220px)')};
  } */
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
    max-width: 10rem;
    display: contents;
  }

  .item__value {
    font-weight: 400;
  }
  .true__percent {
    font-weight: 500 !important;
    color: ${(props) => props.theme.success};
  }
  .percent {
    font-weight: 500 !important;
    color: ${(props) => props.theme.primary};
  }
`;
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(p) => p.theme.backgroundLight};
  padding: 2.4rem;
  gap: 2.4rem;
  border-radius: 0.8rem;
`;
export const Title = styled.div`
  color: ${(p) => p.theme.textPrimary};
  text-align: start;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.6rem;
  font-weight: 500;
  /* margin-bottom: 5rem; */
`;

export const ProgressBarWrapper = styled.div`
  position: relative;
  text-align: center;
  width: 100%;

  .ant-progress.ant-progress-show-info .ant-progress-outer {
    padding-inline-end: 0 !important;
  }
`;

export const NewBox = styled(Box)`
  div:first-child {
    padding-right: 0;
    padding-left: 0;
  }
`;

export const ProgressBarLabel = styled.div<{ color: string }>`
  position: absolute;
  top: -20px;
  right: 0;
  width: 100%;
  color: ${(props) => props.theme.primary};
  font-weight: 700;
  font-size: 1.6rem;
`;
export const RemainingTime = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: ${(p) => p.theme.textSecondary};
  font-size: 1.4rem;
  margin-top: 4rem;

  .timer {
    position: absolute;
    left: 30px;
    top: -16px;
    font-weight: 400;
    display: flex;
    gap: 0.8rem;
    margin-inline-end: 1rem;

    span:nth-child(2) {
      width: 1.8rem;
      text-align: center;
    }
  }

  .timer-animation {
    max-width: 136px;
    max-height: 136px;
    position: absolute;
    left: -60px;
    top: -48px;
  }
`;
export const Description = styled.div`
  margin-top: 0.8rem;
  color: ${(p) => p.theme.primary};
  font-size: 1.4rem;
  font-weight: 500;
  text-align: justify;
`;

export const SimilarityPercentage = styled.div`
  svg {
    width: 5rem;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
  }

  .ant-progress-inner {
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
  }

  .ant-progress-text {
    font-size: 1.2rem !important;
    position: absolute !important;
    top: 55% !important;
  }
`;

export const Index = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const ActionButtonsContainer = styled.div`
  display: flex;
  gap: 0.8rem;
  justify-content: end;
  align-items: center;

  /* ${respondTo.up('md')} {
    margin-top: 4.8rem;
  } */

  ${respondTo.down('md')} {
    margin-top: 2.5rem !important;
    .button_container {
      width: -webkit-fill-available;
    }
  }

  button {
    min-width: 12.4rem;
    ${respondTo.down('md')} {
      width: -webkit-fill-available;
    }
  }

  .previous-form__button {
    min-width: 12.2rem;
  }

  .new_request-form__button {
    font-size: 14px;
    min-width: 12.2rem;
    border-color: ${(p) => p.theme.secondary};
    color: ${(p) => p.theme.primary};
  }

  .cancel-form__button {
    width: 12.2rem;
    border-color: ${(p) => p.theme.primary};
    color: ${(p) => p.theme.primary};
  }

  .continue-form__button {
    width: 12.2rem;
  }

  .new_request-form-button {
    font-size: 14px;
    min-width: 12.2rem;
    color: ${(p) => p.theme.primary};
  }

  ${respondTo.down('md')} {
    .ant-btn {
      width: 100%;
    }
  }
`;

export const ModalWrapper = styled.div`
  .modal-wrapper__header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 0.8rem;

    .ri-error-warning-fill {
      font-size: 2.4rem;
      color: ${(p) => p.theme.warning};
    }
  }

  .modal-wrapper__title {
    font-size: 1.6rem;
    font-weight: 500;
    margin: 0;
  }

  .modal-wrapper__body {
    padding: 0.8rem 0 2.8rem;
  }
`;

export const BackButtonsContainer = styled.div`
  display: flex;
  gap: 0.8rem;
  justify-content: end;
  align-items: center;

  .back-button {
    position: absolute;
    top: 15rem;
  }
`;

export const BoxButtons = styled.div`
  display: flex;
  gap: 1.6rem;
  justify-content: end;

  ${respondTo.down('md')} {
    button {
      width: -webkit-fill-available !important;
    }
  }
`;
