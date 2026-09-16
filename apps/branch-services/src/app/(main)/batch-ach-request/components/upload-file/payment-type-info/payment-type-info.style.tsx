import { Box } from '@branch-services/ui-kit';
import { respondTo } from '@branch-services/utils';
import styled from 'styled-components';

export const PaymentTypeInfoWrapper = styled(Box)`
  flex-direction: column;
  padding: 0 4rem 0 7.8rem;
  row-gap: 3.1rem;
  /* background: red; */
  text-align: justify;
  width: 60%;
  margin: 0 auto;

  ${respondTo.down('xxl')} {
    padding: 0 1rem 0 5rem;
  }
  ${respondTo.down('xl')} {
    display: none;
  }
  & .info-container {
    flex-direction: column;
    justify-content: flex-start;
    row-gap: 1rem;

    & .grid-container {
      display: grid;
      grid-template-columns: max-content auto;
      column-gap: 2.7rem;
    }

    .info-col {
      white-space: break-spaces;
    }
    .titel-col {
      align-self: center;
    }
  }

  p {
    margin: 0;
  }
`;
