import styled from 'styled-components';

import { MessageBox } from '@branch-services/ui-kit';

export const InfoMessage = styled(MessageBox)`
  min-height: 7.2rem;
  padding: 1.2rem 1.6rem;
  align-items: center;
  border: 1px solid ${(props) => props.theme.iconPrimary};
  border-radius: 0.6rem;
  background-color: ${(props) => props.theme.backgroundLight};

  .ant-alert-icon {
    align-self: flex-start;
    color: ${(props) => props.theme.secondary} !important;
    font-size: 1.8rem;
  }

  .ant-alert-content {
    justify-content: center;
  }

  .ant-alert-message {
    color: ${(props) => props.theme.textPrimary};
    font-weight: 400;
    line-height: 2.4rem;
  }

  .ant-alert-close-icon {
    align-self: flex-start;
    padding-top: 0;
    color: ${(props) => props.theme.textPrimary};
    font-size: 1.8rem;
  }
`;

export const Notes = styled.ul`
  margin: 0;
  padding-inline-start: 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  font-size: 1.2rem;
  line-height: 2rem;
`;

export const Days = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const DaysTitle = styled.div`
  color: ${(props) => props.theme.textPrimary};
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 2rem;
`;

// Shown until a start date picks which weekdays get hours
export const DaysEmpty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
  padding: 2.4rem 1.6rem;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 0.8rem;
  color: ${(props) => props.theme.textPrimary};
  font-size: 1.2rem;
  line-height: 2rem;
  text-align: center;
`;
