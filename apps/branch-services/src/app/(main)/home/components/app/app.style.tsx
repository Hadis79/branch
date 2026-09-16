import styled from 'styled-components';

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
`;
