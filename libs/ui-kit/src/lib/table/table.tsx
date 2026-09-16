import { Table as AntTable, TableProps as AntTableProps } from 'antd';
import { ColumnsType as AntColumnsType } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';

import { useTr } from '@branch-services/translation';
import { Nullable } from '@branch-services/types';

import { useResponsive } from '@branch-services/hooks';
import { Button } from '../button/button';

import { Box } from '../box/box';
import { MobileColumn } from './mobile-column';
import * as S from './table.style';
import { ExpandButton } from '../button/expand-button';
import { EmptyData } from '../empty-data/empty-data';
import { Key } from 'antd/lib/table/interface';

export type ColumnsType<T> = AntColumnsType<T> & {
  //
};

export enum PaginationType {
  PAGINATED = 'paginated',
  INCREMENTAL = 'incremental',
}

export type TableProps = Omit<AntTableProps<any>, 'title'> & {
  // Custom props specific to your component
  // isExpandable?: boolean;
  // hidePagination?: boolean;
  total?: number;
  current?: number;
  title?: Nullable<string>;
  hasContainer?: boolean;
  captionChildren?: React.ReactNode;
  mobileColumns?: ColumnsType<any>;
  isLastPage?: boolean;
  checkSelectedRow?: (record, index?: number) => boolean;
  paginationType?: PaginationType;
  rowClassName?: any;
  showSizeChanger?: boolean;
  minHeight?: string;
  resetErrorMessage?: () => void;
};

const ExpandIcon = ({ expanded, onExpand, record }) => (
  <ExpandButton open={expanded} marginX={'1rem'} onClick={(e) => onExpand(record, e)} />
);

export const Table = (props: TableProps) => {
  const {
    // dataSource,
    columns,
    mobileColumns,
    // isExpandable = false,
    expandable,
    pagination,
    total,
    current = 1,
    title,
    hasContainer = true,
    captionChildren = null,
    paginationType = PaginationType.PAGINATED,
    showHeader,
    rowClassName,
    minHeight,
    checkSelectedRow,
    showSizeChanger = true,
    resetErrorMessage,
    ...restProps
  } = props;

  const [t] = useTr();
  const { isMobileOrTablet } = useResponsive();
  const [expandedRowKeys, setExpandedRowKeys] = useState<Key[]>([]);

  useEffect(() => {
    if (props.dataSource && props.dataSource.length > 0) {
      const rowKey = props.rowKey;

      if (typeof rowKey === 'string') {
        setExpandedRowKeys([props.dataSource[0][rowKey]]);
      } else if (typeof rowKey === 'function') {
        setExpandedRowKeys([rowKey(props.dataSource[0])]);
      }
    }
  }, [props.dataSource, props?.dataSource?.length, props.rowKey]);
  const _rowClassName = (record, index) => {
    let className = '';

    if (index % 2 === 0) {
      className = 'even-row';
    } else {
      className = 'odd-row';
    }
    if (rowClassName) {
      className += ' ' + rowClassName(record, index);
    }
    if (checkSelectedRow) {
      className += ` ${checkSelectedRow(record, index) ? 'selected-row' : ''}`;
    }

    return className;
  };

  const _showHeader = showHeader ?? (isMobileOrTablet ? false : !!(props.dataSource && props.dataSource.length));

  const _columns: ColumnsType<any> = [...(columns ?? []), ...(expandable ? [AntTable.EXPAND_COLUMN] : [])];

  const _mcolumns: ColumnsType<any> = [...(mobileColumns ?? []), ...(expandable ? [AntTable.EXPAND_COLUMN] : [])];

  const handleExpandChange = (expanded, record) => {
    if (resetErrorMessage) {
      resetErrorMessage();
    }

    const rowKey = props.rowKey;
    if (typeof rowKey === 'string') {
      setExpandedRowKeys(expanded ? [record[rowKey]] : []);
    } else if (typeof rowKey === 'function') {
      setExpandedRowKeys(expanded ? [rowKey(record)] : []);
    } else {
      console.warn('rowKey is not defined or is of an unexpected type.');
    }
  };

  const _expandable = expandable
    ? {
        // expandedRowRender,
        expandIcon: ExpandIcon,
        expandedRowKeys,
        onExpand: handleExpandChange,
        rowExpandable: () => true,
        expandRowByClick: true,
        ...expandable,
      }
    : undefined;

  const _pagination =
    pagination === false || paginationType === PaginationType.INCREMENTAL
      ? false
      : {
          // onChange: onPaginationUpdate,
          pageSizeOptions: [5, 10, 20, 50, 100],
          showTotal: (total, range) => `${range[0]} - ${range[1]} ${t('common.of')} ${total}`,
          // pageSize: paginationInfo.limit,
          // current: paginationInfo.current,
          total,
          current: current < 1 ? 1 : current,
          // size: 'small',
          responsive: true,
          showSizeChanger,
          // hideOnSinglePage: true,
          // showQuickJumper:true,
          ...pagination,
        };

  const caption =
    title || captionChildren ? (
      <S.Caption>
        <span className={'caption-title'}>{title}</span>
        <span className={'caption-items'}>{captionChildren}</span>
      </S.Caption>
    ) : (
      <></>
    );

  function handleClickMoreItems() {
    if (props?.onChange) {
      props.onChange({}, {}, {}, {} as any);
    }
  }

  const table = (
    <>
      {caption}
      <S.Table
        minHeight={minHeight}
        // caption={caption}
        // dataSource={dataSource}
        columns={isMobileOrTablet && _mcolumns && _mcolumns.length > 0 ? _mcolumns : _columns}
        rowClassName={_rowClassName}
        expandable={_expandable}
        pagination={_pagination}
        showHeader={_showHeader}
        scroll={{ x: 'fit-content' }}
        locale={{
          emptyText: <EmptyData />,
        }}
        {...restProps}
      />

      {paginationType === PaginationType.INCREMENTAL && !props?.isLastPage && (
        <Box marginTop={'1.4rem'} marginBottom={'2.4rem'} fillChildren={false} justifyContent={'center'}>
          <Button
            size={'middle'}
            loading={restProps?.loading}
            icon={<i className={'ri-arrow-down-double-fill'} />}
            onClick={handleClickMoreItems}
          >
            {t('button.display_more_items')}
          </Button>
        </Box>
      )}
    </>
  );

  if (hasContainer) {
    return <S.Wrapper>{table}</S.Wrapper>;
  } else {
    return table;
  }
};

Table.EXPAND_COLUMN = AntTable.EXPAND_COLUMN;
Table.MobileColumn = MobileColumn;
// export default Table;
