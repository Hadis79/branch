import styled from 'styled-components';

// The slots picked so far, framed together with their title and add button
export const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 1.6rem;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 0.8rem;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.6rem;

  .add-button {
    padding-inline: 0;
  }
`;

export const Title = styled.span`
  color: ${(props) => props.theme.textPrimary};
  font-size: 1.4rem;
  font-weight: 500;
`;

export const CalendarBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.divider};
  padding-bottom: 0.8rem;

  .ant-picker-calendar {
    width: 100%;
  }
`;

export const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem 0 1.2rem;
  border-bottom: 1px solid ${(props) => props.theme.divider};
`;

export const MonthTitle = styled.span`
  color: ${(props) => props.theme.textPrimary};
  font-size: 1.4rem;
  font-weight: 500;
`;

export const NavButtons = styled.div`
  display: flex;
  gap: 0.4rem;
`;

export const NavButton = styled.button`
  display: flex;
  padding: 0.4rem;
  border: 0;
  background: none;
  color: ${(props) => props.theme.textPrimary};
  font-size: 1.8rem;
  cursor: pointer;

  &:disabled {
    color: ${(props) => props.theme.textSecondary};
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const TodayButton = styled.button`
  padding: 0.4rem 0.8rem;
  border: 0;
  background: none;
  color: ${(props) => props.theme.primary};
  font: inherit;
  font-size: 1.2rem;
  cursor: pointer;
`;

export const SectionTitle = styled.span`
  color: ${(props) => props.theme.textPrimary};
  font-size: 1.4rem;
  font-weight: 500;
`;
