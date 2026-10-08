import styled from 'styled-components';

export const Container = styled.div`
  width: 24rem;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.4rem;

  > svg {
    width: 14rem;
    height: auto;
  }
`;

export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

export const Title = styled.h3`
  margin: 0;
  color: ${(props) => props.theme.textPrimary};
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 2.4rem;
  text-align: center;
`;

export const Days = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const Day = styled.div<{ $holiday: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.6rem;
  color: ${(props) => (props.$holiday ? props.theme.warning : props.theme.textPrimary)};
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 2rem;
`;

export const Hours = styled.span`
  direction: rtl;
`;
