import styled from 'styled-components';

export const SearchSection = styled.section`
  padding: 3.2rem;
`;

export const SearchGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(20rem, 1fr));
  column-gap: 1.6rem;

  .ant-form-item {
    margin-bottom: 1.6rem;
  }
`;

export const SearchButtonRow = styled.div`
  grid-column: 1 / -1;
  display: flex;
  justify-content: flex-end;

  button {
    margin-bottom: 5rem;
    min-width: 10.4rem;
  }
`;

export const ResultsArea = styled.section`
  flex: 1;
  margin-top: 1.6rem;

  .ant-empty-image {
    height: 17.6rem;
  }
`;

export const ActionGroup = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.4rem;

  button {
    padding-inline: 0.6rem;
  }

  .delete-action {
    color: ${(props) => props.theme.error};
  }
`;

export const MobileRecord = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  width: 100%;
  padding: 0.4rem 0;

  > div:not(:last-child) {
    display: flex;
    justify-content: space-between;
    gap: 1.6rem;
  }

  strong {
    font-weight: 500;
  }

  ${ActionGroup} {
    justify-content: flex-end;
    border-top: 1px solid ${(props) => props.theme.border};
    padding-top: 0.8rem;
  }
`;
