import styled from 'styled-components';

export const DetailsPage = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 75vh;
  padding: 3.2rem;
  box-sizing: border-box;

  > .ant-table-wrapper,
  > .ant-table-wrapper > .ant-spin-nested-loading,
  > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container {
    display: flex;
    flex-direction: column;
    flex: 1 0 auto;
    min-width: 0;
  }

  && .ant-table-wrapper .ant-table-pagination.ant-pagination {
    margin: auto 0 0;
    flex-shrink: 0;
  }
`;

export const TableTitle = styled.h4`
  margin: 0;
  font-size: 1.4rem;
  font-weight: 500;
  color: ${(props) => props.theme.textPrimary};
`;
