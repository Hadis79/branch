import { MessageBox, Panel } from '@branch-services/ui-kit';
import { respondTo } from '@branch-services/utils';
import styled from 'styled-components';

export const AppContainer = styled.div<{ draft?: boolean }>`
  ${(p) =>
    p.draft &&
    `
        padding: 2rem;
        padding: 2rem 3.2rem 3.2rem;
        ${respondTo.down('md')} {
          padding: 2rem 3.2rem 4.7rem;
        }
    `}
  padding: 0 !important;
`;

export const ActionButtonsContainer = styled.div`
  display: flex;
  gap: 0.8rem;
  justify-content: end;
  margin-top: 12rem;

  ${respondTo.down('md')} {
    margin-top: 2.5rem !important;
    .button_container {
      width: -webkit-fill-available;
    }
    .ant-btn-lg {
      font-size: 1.75rem;
    }
  }

  button {
    min-width: 12.4rem;
    ${respondTo.down('md')} {
      width: -webkit-fill-available;
    }
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

export const TraceCode = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #2a2b2b0d;
  border-color: #5d5e5e;
  border: 0.1rem dashed var(--Border-Primary, #aeb0b0);
  border-radius: var(--Corner-Radius, 0.6rem);
  color: ${(props) => props.theme.textPrimary};
  margin-bottom: 2.4rem;
  padding: 1rem 2rem 1rem 2.4rem;

  .ant-alert-icon > * {
    color: #5d5e5e;
  }
  .code {
    display: flex;
    gap: 1.6rem;
    font-size: 1.6rem;
    .trace {
      font-weight: 700;
    }
  }
`;

export const MainPanel = styled(Panel)<{ draft?: boolean }>`
  box-shadow: none;
  ${(p) =>
    p.draft &&
    `
      padding: 3rem;
      height: 100%;
      box-shadow: none;
      ${respondTo.down('md')} {
        padding: 2rem;
      }
    `}
`;
