import styled from 'styled-components';

export const FilterContainer = styled.div`
  padding: 3rem;
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
