import { Box } from '@branch-services/ui-kit';
import { respondTo } from '@branch-services/utils';
import { Modal } from 'antd';
import styled from 'styled-components';

export const ModalWrapper = styled(Modal)`
  .ant-modal-footer {
    margin-top: 4.4rem;
    display: flex;
    justify-content: flex-end;
    gap: 0.8rem;
    ${respondTo.down('md')} {
      margin-top: 5.5rem;
      gap: 1rem;
    }
  }
`;

export const InfoBoxWrapper = styled.div<any>`
  display: grid;
  grid-template-columns: max(0%, 20rem) 1fr max(15%, 20rem) 1fr;
  column-gap: 1%;
  row-gap: ${(p) => (p.dense ? '1rem' : '2.4rem')};
  overflow: hidden;
  ${respondTo.down('md')} {
    grid-template-columns: 1fr 1fr;
    font-size: 1.5rem;
    row-gap: ${(p) => (p.dense ? '1.25rem' : '3rem')};
    .value {
      text-align: end !important;
    }
  }
`;

export const ModalBody = styled.div`
  .modal-subtitle {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
    font-weight: 700;
    .ant-divider-inner-text {
      font-size: 1.4rem;
    }
    ${respondTo.down('md')} {
      margin-top: 1.25rem;
      .ant-divider-inner-text {
        font-size: 1.5rem;
      }
    }
  }
`;

export const MobileTransactionWrapper = styled.div`
  padding: 1rem;

  .transaction-header {
    /* margin-bottom: 2rem; */

    h2 {
      margin: 0;
      font-size: 1.5rem;
      font-weight: bold;
    }
  }

  .transaction-body {
    max-height: 70vh;
    overflow-y: auto;
  }

  .transaction-footer {
    margin-top: 2rem;
    display: flex;
    justify-content: flex-end;
    gap: 0.8rem;
    padding-top: 1rem;
    border-top: 1px solid #f0f0f0;
  }
`;

export const ButtonWrapper = styled(Box)`
  display: flex;
  gap: 1.6rem;
  justify-content: flex-end;

  & .ant-btn {
    flex-basis: fit-content;
    padding: 0.7rem 3rem;
    min-width: -webkit-fill-available;
    margin-top: 2rem;
  }

  ${respondTo.down('md')} {
    gap: 2rem;
    width: -webkit-fill-available !important;
    & .ant-btn {
      font-size: 1.75rem !important;
      padding: 0.875rem 3.75rem;
      margin-top: 2.5rem;
    }
  }
`;

export const title = styled.div`
  ${respondTo.down('md')} {
    font-size: 1.5rem;
  }
`;
