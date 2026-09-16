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
      ${respondTo.down('md')} {
        font-size: 1.5rem;
      }

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
      ${respondTo.down('md')} {
        font-size: 1.5rem;
      }
    }

    .info-item__value {
      font-size: 1.4rem;
      font-weight: 500;
      color: ${(p) => p.theme.textSecondary};
      ${respondTo.down('md')} {
        font-size: 1.5rem;
        text-align: end;
      }
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

      ${respondTo.down('md')} {
        display: flex;
        justify-content: end;
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

export const TraceCode = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #2a2b2b0d;
  border-color: #5d5e5e;
  border: 0.1rem dashed var(--Border-Primary, #aeb0b0);
  border-radius: var(--Corner-Radius, 0.6rem);
  color: ${(props) => props.theme.textPrimary};
  margin-bottom: 2.4rem;
  padding: 1rem 2rem 1rem 2.4rem;

  .ant-alert-icon > * {
    color: #5d5e5e;
  }
  .code {
    display: flex;
    gap: 1.6rem;
    font-size: 1.6rem;
    .trace {
      font-weight: 700;
    }
  }

  ${respondTo.down('md')} {
    font-size: 1.5rem;
    .code {
      font-size: 1.75rem;
    }
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
    .done {
      justify-content: flex-end;
      gap: 0.5rem;
    }
    .info {
      gap: 0.5rem;
    }
    .not-done {
      justify-content: flex-end;
      gap: 0.5rem;
    }
  }
`;
