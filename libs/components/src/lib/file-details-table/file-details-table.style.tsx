import { respondTo } from '@branch-services/utils';
import styled from 'styled-components';

export const FilterContainer = styled.div`
  padding: 3rem;
  ${respondTo.down('md')} {
    padding: 0;
  }
`;

export const ListNumber = styled.div`
  font-size: 1.75rem;
  font-weight: 500;
  padding-bottom: 1rem;
  padding: 0 2rem;
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

export const StatusWrapper = styled.div`
  &.status__success {
    color: ${(props) => props.theme.success};
  }

  &.status__error {
    color: ${(props) => props.theme.error};
  }

  &.status__warning {
    color: ${(props) => props.theme.warning};
  }

  &.status__info {
    color: ${(props) => props.theme.primary};
  }

  &.status__other {
    color: ${(props) => props.theme.textSecondary};
  }
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
