import styled from 'styled-components';

export const Rows = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const Row = styled.div<{ $holiday: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.6rem;
  padding: 1.2rem 1.6rem;
  border-radius: 0.6rem;
  background-color: ${(props) => (props.$holiday ? `${props.theme.warning}14` : props.theme.backgroundLight)};
  font-size: 1.2rem;
  font-weight: 500;
`;

export const DayName = styled.span`
  color: ${(props) => props.theme.textPrimary};
`;

export const Hours = styled.span<{ $holiday: boolean }>`
  color: ${(props) => (props.$holiday ? props.theme.warning : props.theme.textPrimary)};
`;

export const Chips = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
  gap: 0.8rem;
`;

export const Chip = styled.div<{ $holiday: boolean }>`
  padding: 0.8rem 1.2rem;
  border: 0.1rem solid ${(props) => (props.$holiday ? 'transparent' : props.theme.border)};
  border-radius: 0.6rem;
  background-color: ${(props) => (props.$holiday ? `${props.theme.warning}14` : props.theme.backgroundRefrence)};
  color: ${(props) => (props.$holiday ? props.theme.warning : props.theme.textPrimary)};
  font-size: 1.2rem;
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
`;
