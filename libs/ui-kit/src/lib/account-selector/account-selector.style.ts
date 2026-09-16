import styled from 'styled-components';
import { respondTo } from '@branch-services/utils';
import { AutoComplete } from 'antd';

export const Empty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;

  .title {
    font-size: 1.3rem;
    color: ${(p) => p.theme.textPrimary};
    font-weight: bold;
  }

  i {
    font-size: 4rem;
    color: ${(p) => p.theme.textTerritory};
    margin-top: 0.5rem;
  }
`;

export const Title = styled.span`
  color: ${(p) => p.theme.textPrimary};
  padding: 1rem 1rem;
  font-size: 1.4rem;
  font-weight: bold;
`;

export const AutoCompleteWrapper = styled(AutoComplete)`
  .ant-select-selection-search-input {
    font-size: 1.4rem;
    height: 4rem;
    vertical-align: middle;
  }
`;

export const ItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.8rem 0;

  .item__header {
    display: flex;
    gap: 0.8rem;
    .item__header-img {
      align-self: center;
    }
    .item__account-number-label {
      /* padding-left: 0.4rem; */
    }
    .item__value {
      font-weight: 500;
    }

    .item__branch {
      display: flex;
      gap: 0.4rem;
      font-size: 1.2rem;
      font-weight: 400;
    }
  }

  .item__available-balance {
    align-self: center;
  }
`;

export const InfoText = styled.div`
  display: flex;
  gap: 0.4rem;
  font-size: 1.2rem;
  color: ${(p) => p.theme.textPrimary};
  font-weight: 300;
  margin-top: 0.4rem;
`;
