import styled from 'styled-components';
import { respondTo } from '@branch-services/utils';
import { Box } from '@branch-services/ui-kit';

export const SuccessWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  width: 100%;
  height: 20.4rem;
  background-color: ${(p) => p.theme.backgroundLight};
  border-radius: 0.8rem;
  padding: 2.4rem 2.4rem 1rem;

  ${respondTo.down('md')} {
    height: auto;
  }
  .show_detail {
    margin-right: -20px;
  }
  .validation_success_result {
    font-size: 1.75rem;
  }
  .validation_success_desc {
    font-size: 1.5rem;
  }

  .heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.8rem;
    font-weight: 500;
    font-size: 1.6rem;

    div:first-child {
      display: flex;
      align-items: center;
      gap: 0.8rem;
    }

    .ant-btn {
      font-size: 1.4rem;
      font-weight: 500;
    }
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

export const Index = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const SimilarityPercentage = styled.div`
  svg {
    width: 5rem;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important ;
  }
  .ant-progress-inner {
    display: flex !important;
    justify-content: center !important;
    align-items: center !important ;
  }
  .ant-progress-text {
    font-size: 1.2rem !important;
    position: absolute !important;
    top: 55% !important;
  }
`;

export const NewBox = styled(Box)`
  div:first-child {
    padding-right: 0;
    padding-left: 0;
  }
`;
