import styled from 'styled-components';
import { respondTo } from '@branch-services/utils';
import { MessageBox } from '@branch-services/ui-kit';

export const Search = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  padding: 2.4rem 3.2rem;

  ${respondTo.down('xl')} {
    grid-template-columns: 1fr;
  }

  .full-width {
    width: 100%;
  }

  .filter-row {
    display: flex;
    gap: 16px;
  }

  .remove-filter {
    justify-content: flex-end;
    color: ${(props) => props.theme.primary};
    &:hover {
      color: ${(props) => props.theme.primary} !important;
    }
  }

  .button-container {
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }
`;

export const CustomMessageBox = styled(MessageBox)`
  background-color: ${(p) => p.theme.backgroundLight};
  border: none;
  color: ${(props) => props.theme.textPrimary};
  padding: 1rem 2rem 1rem 2.4rem;
  margin: 4rem 3.2rem 2.4rem;
  font-weight: 500;

  svg {
    width: 18px;
    height: 18px;
  }

  .ant-alert-icon > * {
    color: ${(p) => p.theme.textPrimary};
  }
`;
