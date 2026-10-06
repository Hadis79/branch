import styled from 'styled-components';

export const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 1.6rem;
  color: ${(props) => props.theme.textPrimary};
  font-size: 1.4rem;
  font-weight: 500;

  i {
    font-size: 1.8rem;
  }
`;
