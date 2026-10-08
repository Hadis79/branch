import styled from 'styled-components';

export const DefaultCard = styled.div`
  padding: 1.6rem 2.4rem;
  border-radius: 0.8rem;
  background-color: ${(props) => props.theme.backgroundLight};
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.6rem;
`;

export const DefaultHeader = styled(CardHeader)`
  margin-bottom: 1.6rem;
`;

export const Chips = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
  gap: 0.8rem;
`;

export const ExceptionCard = styled.div`
  padding: 1.6rem 2.4rem;
  border: 0.1rem solid ${(props) => props.theme.border};
  border-radius: 0.8rem;
`;
