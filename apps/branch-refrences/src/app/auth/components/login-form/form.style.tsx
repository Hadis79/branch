import styled from 'styled-components';
import { respondTo } from '@branch-services/utils';

export const SubmitWrapper = styled.div`
  margin-top: 3.2rem;

  /* ${respondTo.down('xl')} {
    grid-template-columns: 1fr;
  } */

  .account__owner-name-text {
    display: flex;
    gap: 0.4rem;
    font-size: 1.2rem;
    color: ${(p) => p.theme.textPrimary};
    font-weight: 300;
    margin-top: 0.4rem;
  }

  img {
    height: 4.1rem;
    border: 0.1rem solid #ccc;
    border-radius: 0.4rem;
    ${respondTo.down('md')} {
      height: 5rem !important;
      max-width: 11rem;
    }
  }
`;
