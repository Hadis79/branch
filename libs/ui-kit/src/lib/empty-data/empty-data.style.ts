import styled from 'styled-components';

export const EmptyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  gap: 5rem;

  .empty__button {
    width: 12rem;
    align-self: flex-end;
    border-color: ${(props) => props.theme.primary};
    color: ${(props) => props.theme.primary};
  }

  .ant-empty .ant-empty-image {
    margin-bottom: 1.6rem;
  }
`;
