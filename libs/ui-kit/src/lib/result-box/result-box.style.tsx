import styled, { css } from 'styled-components';
import { Box } from '../box/box';
import { respondTo } from '@branch-services/utils';

export const ResultBoxContainer = styled(Box)<any>`
  display: grid;
  grid-template-columns: 25% 75%;
  grid-row-gap: 0.8rem;
  padding: 1.6rem 2.4rem;

  ${(p) =>
    p.modal_view &&
    css`
      grid-template-columns: 40% 60%;
      padding: 1.6rem 0 3rem;
    `}

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
    margin: 1.6rem 0;

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
    ${(p) =>
      p.modal_view &&
      css`
        justify-items: end;
        display: grid;
      `}
  }
`;
