import { Box } from '@branch-services/ui-kit';
import styled from 'styled-components';

export const DataTableBoxWrapper = styled.div``;

export const MobileTableItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: 1.5rem;
  font-weight: bold;
  color: ${(props) => props.theme.textSecondary};

  margin-bottom: 1rem;

  .item__title {
    max-width: 10rem;
  }

  .item__value {
    font-weight: 400;
  }
`;

export const ButtonWrapper = styled(Box)`
  display: flex;
  gap: 1.6rem;
  justify-content: flex-end;

  & .ant-btn {
    flex-basis: fit-content;
    min-width: 2rem;
  }
  & .ant-btn-delete {
    color: ${(props) => props.theme.error};
  }
`;
