import { useTr } from '@branch-services/translation';
import { Button, ColumnsType, Table } from '@branch-services/ui-kit';

import React, { useEffect } from 'react';
import useFilterQuery from '../../queries/use-filter-query';
import { addThousandSeparator, datetimeLocale, getValueOrDash } from '@branch-services/utils';
import HistoryDetail from '../history-detail/history-detail';
import { getStatusClassName } from '../../utils/utils';
import * as S from './history.style';
import useBatchAchHistoryStore from '../../store/use-widget-store';
import { DataType, TransactionModal } from '@branch-services/components';

const History = () => {
  const [t] = useTr();

  const {
    transactionModal,
    setPagination,
    setOpenTransactionModal,
    pagination: paginationStore,
    transactionKeys,
    resetDownloadErrorMessage,
    resetMessage,
    resetFilter,
  } = useBatchAchHistoryStore();

  const { data, isFetching } = useFilterQuery();

  useEffect(() => {
    resetMessage();
    resetFilter();
  }, []);

  const columns: ColumnsType<any> = [
    {
      title: '#',
      dataIndex: 'id',
      align: 'center',
      width: 100,
      render: (text, record, index) => {
        return data?.pageable?.offset + index + 1;
      },
    },
    {
      title: t('register_date'),
      dataIndex: 'createdOn',
      align: 'center',
      width: 300,
      render: (value) => (value ? datetimeLocale(value) : '-'),
    },
    {
      title: t('trace_code'),
      dataIndex: 'traceCode',
      align: 'center',
      width: 300,
      render: (value) => getValueOrDash(value),
    },
    {
      title: t('accountNumber'),
      dataIndex: 'accountNumber',
      align: 'center',
      width: 300,
      render: (value) => getValueOrDash(value),
    },
    {
      title: t('label.request_type'),
      dataIndex: 'requestTypeTitle',
      align: 'center',
      width: 300,
      render: (value) => getValueOrDash(value),
    },
    {
      title: t('status'),
      dataIndex: 'requestStatusTitle',
      align: 'center',
      width: 300,
      render: (value, record) => (
        <S.StatusWrapper className={getStatusClassName(record?.requestStatus)}>{getValueOrDash(value)}</S.StatusWrapper>
      ),
    },
    {
      title: `${t('deposit_amount')} (${t('common.rial')})`,
      dataIndex: 'totalAmount',
      align: 'center',
      width: 300,
      render: (value) => getValueOrDash(addThousandSeparator(value)),
    },
  ];

  const handleTableChange = (_pagination) => {
    const { current, pageSize } = _pagination;
    const pageSizeChanged = pageSize !== paginationStore.size;

    setPagination({
      ...paginationStore,
      size: pageSize,
      page: pageSizeChanged ? 1 : current,
    });
  };

  const modalFooter = () => {
    return (
      <>
        <Button
          style={{ display: 'flex', justifySelf: 'self-end', minWidth: '14rem' }}
          size='large'
          type='primary'
          onClick={() => setOpenTransactionModal(false)}
        >
          {t('close')}
        </Button>
      </>
    );
  };

  return (
    <>
      <Table
        minHeight={'0'}
        columns={columns}
        current={paginationStore?.page}
        pagination={{
          current: paginationStore.page,
          pageSize: paginationStore.size,
        }}
        onChange={handleTableChange}
        total={data?.totalElements}
        dataSource={data?.content}
        hasContainer={false}
        bordered={false}
        loading={isFetching}
        expandable={{
          expandedRowRender: (record) => <HistoryDetail data={record} />,
        }}
        resetErrorMessage={resetDownloadErrorMessage}
        rowKey={'requestTracingCode'}
      />
      {transactionModal && (
        <TransactionModal
          title={t('uploaded_file_info')}
          dataType={DataType.TRANSACTION_KEYS}
          ssn={transactionKeys?.ssn}
          id={transactionKeys?.id}
          open={transactionModal as boolean}
          footer={modalFooter()}
        />
      )}
    </>
  );
};

export default History;
