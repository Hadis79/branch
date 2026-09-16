import { useTr } from '@branch-services/translation';
import { Box, Button, ColumnsType, Table } from '@branch-services/ui-kit';

import React, { useEffect, useState } from 'react';
import useFilterQuery from '../../queries/use-filter-query';
import { addThousandSeparator, datetimeLocale, formatAmount, getValueOrDash } from '@branch-services/utils';
import HistoryDetail from '../history-detail/history-detail';
import { getStatusClassName } from '../../utils/utils';
import * as S from './history.style';
import useListRequestStore from '../../store/use-widget-store';
import { DataType, TransactionModal } from '@branch-services/components';
import useClientSsn from '../../../create-request/components/submit-request/clientSsn';
import useTransactionModalDetailsQuery from '../../queries/use-transaction-details';
import { useResponsive } from '@branch-services/hooks';
import HistoryDetailBottomSheet from '../history-detail/history-bottom-sheet';

const History = () => {
  const [t] = useTr();

  const {
    transactionModal,
    setPagination,
    setOpenTransactionModal,
    pagination: paginationStore,
    resetDownloadErrorMessage,
    resetMessage,
    resetFilter,
    requestId,
    requestType,
    status,
    setopenHistoryBottomSheet,
  } = useListRequestStore();
  const clientSsn = useClientSsn();
  useEffect(() => {
    refetch();
  }, [clientSsn]);

  const { data, isFetching, refetch } = useFilterQuery();
  const { isMobileOrTablet } = useResponsive();
  const { data: dataTransAction, refetch: refetchTransAction } = useTransactionModalDetailsQuery(
    requestId,
    status,
    requestType
  );
  const [selectedRowData, setSelectedRowData] = useState<any>(null);

  useEffect(() => {
    resetMessage();
    resetFilter();
    return () => {
      setOpenTransactionModal(false);
    };
  }, []);

  useEffect(() => {
    setPagination({ ...paginationStore, page: 1 });
  }, [paginationStore.size]);

  const mobileColumns: ColumnsType<any> = [
    {
      title: '',
      dataIndex: '',

      render: (value, record, expandIcon) => {
        return (
          <Box flexDirection='column'>
            <S.MobileTableItem>
              <span className='item__title'>{t('status')}</span>
              <span className='item__value'>
                <S.StatusWrapper className={getStatusClassName(record?.status)}>
                  {getValueOrDash(record?.requestStatusTitle)}
                </S.StatusWrapper>
              </span>
            </S.MobileTableItem>
            <S.MobileTableItem>
              <span className='item__title'>{t('deposit_amount')}</span>
              <span className='item__value'>{addThousandSeparator(record?.totalAmount)}</span>
            </S.MobileTableItem>
            <S.MobileTableItem>
              <span className='item__title'>
                {t(record?.withWithdraw ? 'source_account_number' : 'label.returend_account_number')}
              </span>
              <span className='item__value'>{getValueOrDash(record?.accountNumber)}</span>
            </S.MobileTableItem>
            <S.MobileTableItem>
              <span className='item__title'>{t('label.deposit_type')}</span>
              <span className='item__value'>
                {record?.withWithdraw ? t('transfer_by_account_title') : t('transfer_by_cheque_title')}
              </span>
            </S.MobileTableItem>
            <S.MobileTableItem>
              <span className='item__title'>{t('register_date')}</span>
              <span className='item__value'>{record?.createdOn ? datetimeLocale(record?.createdOn) : '-'}</span>
            </S.MobileTableItem>
          </Box>
        );
      },
    },
  ];

  const columns: ColumnsType<any> = [
    {
      title: '#',
      dataIndex: 'id',
      align: 'center',
      width: 100,
      render: (text, record, index) => {
        return (paginationStore.page - 1) * paginationStore.size + index + 1;
        // return data?.pageable?.offset + index + 1;
      },
    },
    {
      title: t('register_date'),
      dataIndex: 'createdOn',
      align: 'center',
      render: (value) => (value ? datetimeLocale(value) : '-'),
    },
    {
      title: t('label.trace_code'),
      dataIndex: 'traceCode',
      align: 'center',
      render: (value) => getValueOrDash(value),
    },
    {
      title: t('label.origin_account_number'),
      dataIndex: 'accountNumber',
      align: 'center',
      render: (value) => getValueOrDash(value),
    },

    {
      title: t('label.request_type'),
      dataIndex: 'requestTypeTitle',
      align: 'center',
      render: (value) => getValueOrDash(value),
    },
    {
      title: t('deposit_amount'),
      dataIndex: 'totalAmount',
      align: 'center',
      render: (value) => addThousandSeparator(value),
    },
    {
      title: t('status'),
      dataIndex: 'requestStatusTitle',
      align: 'center',
      render: (value, record) => (
        <S.StatusWrapper className={getStatusClassName(record?.status)}>{getValueOrDash(value)}</S.StatusWrapper>
      ),
    },
  ];

  const handleTableChange = (_pagination) => {
    const { current, pageSize } = _pagination;

    setPagination({ ...paginationStore, size: pageSize, page: current });
  };

  useEffect(() => {
    if (transactionModal) {
      refetchTransAction();
    }
  }, [transactionModal]);

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
        mobileColumns={mobileColumns}
        onChange={handleTableChange}
        total={data?.totalElements}
        dataSource={data?.content}
        hasContainer={false}
        bordered={false}
        loading={isFetching}
        onRow={(record) => ({
          onClick: () => {
            if (isMobileOrTablet) {
              setSelectedRowData(record);
              resetMessage();
              setopenHistoryBottomSheet(true);
            }
          },
        })}
        // expandable={
        //     !isMobileOrTablet
        //       ? {
        //           expandedRowRender: (record) => (
        //             <HistoryDetail data={record} />
        //           ),
        //         }
        //       : undefined
        //   }
        {...(!isMobileOrTablet && {
          expandable: {
            expandedRowRender: (record) => !isMobileOrTablet && <HistoryDetail data={record} />,
          },
        })}
        resetErrorMessage={resetDownloadErrorMessage}
        rowKey={'requestId'}
      />
      {isMobileOrTablet && selectedRowData && <HistoryDetailBottomSheet data={selectedRowData} />}
      {transactionModal && (
        <TransactionModal
          title={t('uploaded_file_info')}
          dataType={DataType.FULL_DATA}
          fullData={dataTransAction}
          open={dataTransAction}
          footer={modalFooter()}
          fnc={setOpenTransactionModal}
        />
      )}
    </>
  );
};

export default History;
