import { MessageBox } from '@branch-services/ui-kit';
import styled from 'styled-components';

export const AppContainer = styled.div`
  padding: 2rem 3.2rem 3.2rem;
`;

export const ActionButtonsContainer = styled.div`
  display: flex;
  gap: 0.8rem;
  justify-content: end;
  margin-top: 12rem;

  button {
    min-width: 12.4rem;
  }
`;

export const CustomMessageBox = styled(MessageBox)`
  background-color: #2a2b2b0d;
  border-color: #5d5e5e;
  color: ${(props) => props.theme.textPrimary};
  margin-bottom: 2.4rem;
  padding: 1rem 2rem 1rem 2.4rem;

  .ant-alert-icon > * {
    color: #5d5e5e;
  }
`;
