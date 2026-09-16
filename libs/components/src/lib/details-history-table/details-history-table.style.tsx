import { respondTo } from '@branch-services/utils';
import styled from 'styled-components';

export const FilterContainer = styled.div`
  padding: 3rem;
  .filter-box {
    ${respondTo.down('md')} {
      width: -webkit-fill-available !important;
      .filter {
        width: -webkit-fill-available !important;
        .filter-button {
          width: -webkit-fill-available !important;
        }
      }
    }
  }
`;

export const Search = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  padding: 2.4rem 3.2rem;

  ${respondTo.down('xl')} {
    grid-template-columns: 1fr;
  }

  ${respondTo.down('md')} {
    padding: 0;
  }

  .full-width {
    width: 100%;
  }

  .filter-row {
    display: flex;
    gap: 16px;
  }

  .remove-filter {
    justify-content: flex-end;
    color: ${(props) => props.theme.primary};
    &:hover {
      color: ${(props) => props.theme.primary} !important;
    }
  }

  .button-container {
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }
`;

export const ListNumber = styled.div`
  font-size: 1.75rem;
  font-weight: 500;
  padding-bottom: 1rem;
  padding-left: 1rem;
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
