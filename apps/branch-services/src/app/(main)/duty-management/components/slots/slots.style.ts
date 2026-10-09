import styled from 'styled-components';

export const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
`;

export const Chip = styled.div`
  padding: 0.8rem 1.2rem;
  border: 0.1rem solid ${(props) => props.theme.border};
  border-radius: 0.6rem;
  background-color: ${(props) => props.theme.backgroundRefrence};
  color: ${(props) => props.theme.textPrimary};
  font-size: 1.2rem;
  font-weight: 500;
  white-space: nowrap;
`;

export const Rows = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

// Date on the start edge, hours on the end edge
export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.6rem;
  min-height: 4rem;
  padding: 0.8rem 1.6rem;
  border-radius: 0.6rem;
  background-color: ${(props) => props.theme.backgroundLight};
  color: ${(props) => props.theme.textPrimary};
  font-size: 1.2rem;
  font-weight: 500;
`;

export const RemoveButton = styled.button`
  display: flex;
  padding: 0;
  border: 0;
  background: none;
  color: ${(props) => props.theme.textSecondary};
  font-size: 1.6rem;
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.error};
  }
`;
