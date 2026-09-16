import { Table as AntTable } from 'antd';
import styled from 'styled-components';

import { cssVar } from '@branch-services/utils';

import { Panel } from '../panel/panel';

export const Wrapper = styled(Panel)`
  padding: 0;
  // min-height: 40rem;
`;

export const Table = styled<any>(AntTable)`
  --table-min-height: ${(p) => (p.minHeight ? p.minHeight : '40rem')};

  div.ant-table {
    min-height: var(--table-min-height);
  }

  .ant-table-container::before {
    box-shadow: none !important;
  }

  tr.ant-table-placeholder {
    height: var(--table-min-height);
  }

  table {
  }

  thead {
    //background-color: ${(p) => p.theme.background};
    border-radius: 0;
  }

  tbody tr {
    border-radius: 0;
  }

  tbody tr.odd-row {
    background-color: ${(p) => p.theme.cardColor};
  }

  tbody tr.odd-row + .ant-table-expanded-row {
    background-color: ${(p) => p.theme.cardColor};
  }

  tbody tr.selected-row {
    background-color: ${(p) => p.theme.primaryLight} !important;
  }

  tbody tr.selected-row + .ant-table-expanded-row {
    background-color: ${(p) => p.theme.cardColor} !important;
  }

  thead > tr > th {
    padding: 1.4rem !important;
  }

  thead > tr > th::before {
    width: 0 !important;
  }

  thead > tr > th::before,
  thead > tr > td::before {
    width: 0 !important;
  }

  thead,
  tbody tr.even-row {
    background-color: ${(p) => p.theme.surface};
  }

  tbody tr.even-row + .ant-table-expanded-row {
    background-color: ${(p) => p.theme.surface};
  }

  tbody tr.ant-table-row:hover {
    // background-color: ${(p) => p.theme.background};
    cursor: pointer;
  }

  .ant-table-row-selected > td {
    background-color: inherit !important;
  }

  .ant-pagination {
    padding: 2.4rem 3rem;
  }

  .ant-pagination-options {
    order: -1;
    margin: 0 1.6rem 0 0;
  }
  .ant-btn-icon {
    margin: 0;
  }

  & div.ant-table-empty table > tbody > tr.ant-table-placeholder > td {
    border-bottom: 0;
  }

  & table > thead > tr:first-child > *:first-child,
  & table > thead > tr:first-child > *:last-child {
    border-start-start-radius: 0 !important;
    border-start-end-radius: 0 !important;
  }
`;

export const Caption = styled.div`
  background-color: ${(p) => p.theme.surface};
  color: ${(p) => p.theme.textPrimary};
  border-radius: var(${cssVar.radius});
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 2.4rem 3rem;

  .caption-title {
    font-size: 1.8rem;
    font-weight: 500;
    text-align: left;
    margin-right: 2rem;
  }

  .caption-items {
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
`;

export const MobileColumnWrapper = styled.div`
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
