import styled from 'styled-components';
import { respondTo } from '@branch-services/utils';

export const Badges = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2.4rem;
  overflow-x: auto;

  .badge-item {
    /* min-width: 5rem; */
    display: inline-flex;
    align-items: center;
    white-space: nowrap;
    background: ${(p) => p.theme.background};
    padding: 0.8rem 1.6rem;
    border-radius: 5rem;

    ${respondTo.down('lg')} {
      padding: 0.5rem 1.6rem;
    }

    span:nth-child(2) {
      font-weight: 500;

      ${respondTo.down('sm')} {
        /* overflow: hidden; */
        white-space: nowrap;
        /* text-overflow: ellipsis; */
      }
    }
  }
`;
