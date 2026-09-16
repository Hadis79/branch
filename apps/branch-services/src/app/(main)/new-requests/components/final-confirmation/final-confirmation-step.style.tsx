import { Box } from '@branch-services/ui-kit';
import { respondTo } from '@branch-services/utils';
import { Form } from 'antd';
import styled from 'styled-components';

export const FinalFormWrapper = styled(Form)`
  padding-top: 1.6rem;

  .payment_id {
    padding-left: 0.5rem;
    color: ${(p) => p.theme.primary};
    font-size: 1.6rem;
  }

  .deposit-id__box {
    background-color: ${(p) => p.theme.backgroundLight};
    padding: 1.6rem 2.4rem;
    display: grid;
    grid-template-columns: 20% 75%;
    grid-row-gap: 1.6rem;
    border: 1px dashed ${(p) => p.theme.border};
    border-radius: 1rem;
    margin-bottom: 2.4rem;
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

export const ButtonWrapper = styled.div`
  .ant-btn-icon {
    font-size: 18px;
  }
`;

export const Done = styled.div`
  .done {
    display: flex;
    justify-content: flex-start;
    gap: 0.4rem;
    color: ${(props) => props.theme.success};
    font-weight: 500;
  }

  .info {
    color: ${(props) => props.theme.primary};
    display: flex;
    justify-content: flex-start;
    gap: 0.4rem;
    font-weight: 500;
  }

  .not-done {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0.4rem;
  }

  svg {
    width: 2rem;
    height: 2rem;
  }

  ${respondTo.down('md')} {
    svg {
      width: 2.25rem;
      height: 2.25rem;
    }
  }
`;
