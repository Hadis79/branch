import { respondTo } from '@branch-services/utils';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: calc(100vh - 26rem);
  max-width: 50rem;
  gap: 2.4rem;
  align-self: center;

  svg {
    flex-shrink: 0;
  }

  .message {
    font-size: 1.6rem;
    font-weight: 500;
    margin-bottom: 2.4rem;
  }

  .item {
    color: ${(p) => p.theme.textPrimary};
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .item_title {
      font-size: 1.4rem;
    }
    .item_value {
      text-align: end;
      font-size: 1.4rem;
      font-weight: 500;
    }
  }

  .item.total_amount .item_title {
    align-self: start;
  }
  .item.total_amount .item_value sub {
    font-weight: 400;
    display: inline-block;
    margin-bottom: 1.4rem;
  }

  .buttons-container {
    width: 100%;
    justify-content: space-between;
    display: flex;
    align-items: center;
    gap: 0.8rem;

    .ant-btn {
      flex: 1;
    }

    ${respondTo.down('md')} {
      margin-top: auto;
    }
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  align-items: start;
  flex-direction: column;
  gap: 1rem;
  color: ${(p) => p.theme.textPrimary};

  .head {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    margin-bottom: 1rem;

    span {
      font-size: 1.6rem;
      font-weight: 500;
    }
  }
`;
