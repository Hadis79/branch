import styled from 'styled-components';
import { respondTo } from '@branch-services/utils';

export const AppContainer = styled.div`
  background-color: ${(p) => p.theme.surface};
  padding: 3.2rem;
  width: 100%;
  max-width: 150rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 4rem;
  border-radius: 1.2rem;
  ${respondTo.down('md')} {
    margin: 0 auto;
    min-height: 100vh;
  }
`;
