import styled from 'styled-components';
import { Box } from '../box/box';
import { boxShadowThin, cssVar } from '@branch-services/utils';

export const Wrapper = styled(Box)`
  margin-top: 2.4rem;
  display: flex;
  flex-direction: column;
  border-radius: var(${cssVar.radius});
  background-color: ${(p) => p.theme.cardColor};
  padding: 1.4rem 2.4rem;
  box-shadow: ${boxShadowThin};

  & .lazybox__header {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    cursor: pointer;

    & .header__title__container {
      display: flex;
      flex-wrap: wrap;
      column-gap: 1rem;
    }

    & .lazybox__header__title {
      color: ${(p) => p.theme.textSecondary};
      font-size: 1.6rem;
      font-weight: bold;
    }

    & .lazybox__header__subtitle {
      color: ${(p) => p.theme.textSecondary};
      font-size: 1.4rem;
      flex-grow: 1;
      //margin: 0 1rem;
    }
  }

  & .lazybox__body {
  }
`;
