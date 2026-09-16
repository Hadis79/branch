import { Box } from '@branch-services/ui-kit';
import { respondTo } from '@branch-services/utils';
import { Form } from 'antd';
import styled from 'styled-components';

export const FinalFormWrapper = styled(Form)`
  padding: 2.4rem 3.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  /* height: calc(100vh - 20rem); */

  ${respondTo.down('md')} {
    height: calc(100vh - 2rem);
  }
`;

export const FinalConfirmationStyle = styled.div`
  .final-confirmation__container {
    display: grid;
    grid-template-columns: 25% 75%;
    grid-row-gap: 1.6rem;

    ${respondTo.down('lg')} {
      grid-template-columns: 40% 60%;
    }

    .info-header {
      display: grid;
      grid-template-columns: max-content auto;
      font-size: 1.4rem;
      font-weight: bold;
      color: ${(p) => p.theme.textSecondary};
      grid-column: 1/-1;

      .line {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-left: 1.6rem;

        > span {
          display: block;
          width: 100%;
          border-top: 0.5px dotted gray;
        }
      }
    }

    .info-item__title {
      font-size: 1.4rem;
      font-weight: normal;
      color: ${(p) => p.theme.textSecondary};
    }

    .info-item__value {
      font-size: 1.4rem;
      font-weight: 500;
      color: ${(p) => p.theme.textSecondary};
    }

    .transaction_details_link {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      color: ${(p) => p.theme.primary};
      cursor: pointer;

      i {
        font-size: 2rem;
        color: ${(p) => p.theme.primary};
      }
    }
  }
`;

export const ButtonWrapper = styled(Box)`
  display: flex;
  gap: 1.6rem;
  justify-content: flex-end;

  & .ant-btn {
    flex-basis: fit-content;
    padding: 0.7rem 3rem;
    min-width: 12rem;
  }
`;
