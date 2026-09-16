import { useTr } from '@branch-services/translation';
import { Button, ColumnsType, Table } from '@branch-services/ui-kit';

import React, { useEffect } from 'react';
import { addThousandSeparator, datetimeLocale, getValueOrDash } from '@branch-services/utils';
import * as S from './history.style';
import { getStatusClassName } from '../../utils/consts';
import HistoryDetail from '../history-detail/history-detail';
import useHistoryQuery from '../../queries/use-history-query';
import useNewRequestsWidgetStore from '../../store/use-widget-store';
import { DataType, TransactionModal } from '@branch-services/components';
import { ReactComponent as ActiveValidation } from '../../assets/media/active-validation.svg';
import { Statuses } from '../../utils/enums';
import useTransactionModalDetailsQuery from '../../queries/use-transaction-details';

const History = () => {
  const [t] = useTr();
  const { data, isFetching, refetch: refetchNewRequests } = useHistoryQuery();
  const { data: transactionDetailsData } = useTransactionModalDetailsQuery();

  const {
    pagination: paginationStore,
    setPagination,
    setOpenTransactionDetails,
    openTransactionDetails,
  } = useNewRequestsWidgetStore();

  function calculateRow(index: number) {
    return paginationStore.page * paginationStore.size + index + 1;
  }

  useEffect(() => {
    if (paginationStore.page !== 0) {
      setPagination({ ...paginationStore, page: 0 });
    }
  }, []);

  const columns: ColumnsType<any> = [
    {
      title: '#',
      dataIndex: 'id',
      align: 'center',
      width: 200,
      render: (value, record, index) => calculateRow(index),
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
      title: <div style={{ whiteSpace: 'nowrap' }}>{t('legal_ssn')}</div>,
      dataIndex: 'clientSSN',
      align: 'center',
      width: 300,
      render: (value) => getValueOrDash(value),
    },
    {
      title: t('origin_account_number'),
      dataIndex: 'accountNumber',
      align: 'center',
      width: 300,
      render: (value) => getValueOrDash(value),
    },
    // {
    //   title: t('user_org_name'),
    //   dataIndex: '-',
    //   align: 'center',
    //   width: 300,
    //   render: (value) => getValueOrDash(value),
    // },
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
        <S.StatusWrapper className={getStatusClassName(record?.status)}>
          {record.status === Statuses.ACTIVE && <ActiveValidation />}
          {getValueOrDash(value)}
        </S.StatusWrapper>
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

  const modalFooter = () => {
    return (
      <>
        <Button
          style={{ display: 'flex', justifySelf: 'self-end', minWidth: '14rem' }}
          size='large'
          type='primary'
          onClick={() => setOpenTransactionDetails(false)}
        >
          {t('close')}
        </Button>
      </>
    );
  };

  const handleOnChange = async (pagination) => {
    const current = pagination.current;
    const size = pagination.pageSize;

    const paginationInfo = {
      ...paginationStore,
      current: current,
      page: current - 1,
      size: size,
    };

    await setPagination(paginationInfo);
    refetchNewRequests();
  };

  return (
    <>
      <Table
        minHeight={'0'}
        columns={columns}
        current={paginationStore?.current as any}
        onChange={handleOnChange}
        total={data?.totalElements}
        dataSource={data?.content}
        hasContainer={false}
        bordered={false}
        loading={isFetching}
        expandable={{
          expandedRowRender: (record, index, indent, expanded) => <HistoryDetail data={record} expanded={expanded} />,
        }}
        rowKey={'requestId'}
      />
      {transactionDetailsData && (
        <TransactionModal
          title={t('uploaded_file_info')}
          dataType={DataType.FULL_DATA}
          fullData={transactionDetailsData?.headerInfo}
          open={openTransactionDetails as boolean}
          footer={modalFooter()}
        />
      )}
    </>
  );
};

export default History;
