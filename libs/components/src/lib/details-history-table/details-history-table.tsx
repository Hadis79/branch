import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  ColumnsType,
  FilterButton,
  Input,
  MessageBox,
  Select,
  SelectProps,
  Table,
} from '@branch-services/ui-kit';
import useFileDetailsQuery from './use-details-history-table-query';
import { useTr } from '@branch-services/translation';
import { addThousandSeparator, getValueOrDash, isEmptyObjectValues, resetFormExcept } from '@branch-services/utils';
import { DownloadIcon } from '@branch-services/layouts';
import useFileDetailsTableStore from './details-history-table-store';

import * as S from './details-history-table.style';
import { getStatusClassName } from '../utils/utils';
import { Props } from './types';
import { Form, Spin } from 'antd';
import { useForm } from 'antd/es/form/Form';
import useFileFilterDetailsQuery from './use-file-filter-query';
import { usePathname } from 'next/navigation';
import usePaymentStatus from './use-payment-status';
import usePurposesQuery from './use-get-purposes-query';
import { RequestStatus } from '../utils/consts';
import { Statuses } from './consts';
import { useResponsive } from '@branch-services/hooks';
import useDownloadReceiptQuery from './use-download-receipt';

export const DetailsHistoryTable: React.FC<Props> = (props) => {
  const [t] = useTr();
  const pathname = usePathname();
  const {
    pagination: paginationStore,
    setPagination,
    filter,
    purposes,
    setFilter,
    resetFilter,
    downloadErrorMessage,
    resetMessage,
    resetDownloadErrorMessage,
  } = useFileDetailsTableStore();
  const { ssn, id, serviceUrl, status, requestType } = props;
  const [form] = useForm();
  // const { data: statuses, isLoading: statusLoading } = useFileFilterDetailsQuery();
  const [isFilterActive, setIsFilterActive] = useState<boolean>(false);
  const { data: dataStatus } = usePaymentStatus();
  const { isMobileOrTablet } = useResponsive();
  const { data: dataPurpose, isLoading: purposesLoading } = usePurposesQuery();
  const cacheStatus = [
    Statuses.INITIATED,
    Statuses.ACTIVE,
    Statuses.INACTIVE,
    Statuses.VALIDATION_SUCCESS,
    Statuses.VALIDATION_FAILURE,
    Statuses.NONE,
  ];

  const { data, error, isLoading, isError, refetch, isFetching } = useFileDetailsQuery({
    ssn: ssn,
    id: id,
    serviceUrl,
    size: paginationStore.size,
    page: paginationStore.page,
    filter: filter,
    status: status as Statuses,
    requestType,
  });
  const { refetch: refetchDownloadReceipt, downloadingId } = useDownloadReceiptQuery();

  const FORM_ITEM_NAMES = {
    destinationAccount: 'destinationAccount',
    status: 'status',
    deposit_id: 'deposit_id',
    userSSN: 'userSSN',
    fromAmount: 'fromAmount',
    toAmount: 'toAmount',
    paymentType: 'paymentType',
    traceCode: 'traceCode',
    requestStatus: 'requestStatus',
    purpose: 'purpose',
  };
  const mainInputNames = [FORM_ITEM_NAMES.destinationAccount];

  useEffect(() => {
    setPagination({ ...paginationStore, page: 0, current: 1 });
  }, [paginationStore.size]);

  useEffect(() => {
    return () => {
      setPagination({
        size: 10,
        page: 0,
        current: 1,
      });
      resetFilter();
    };
  }, []);

  useEffect(() => {
    return () => {
      resetFilter();
    };
  }, []);

  const downloadReceipt = (detailsId) => {
    refetchDownloadReceipt({
      requestId: id,
      detailsId: detailsId,
    });
  };

  const mobileColumns: ColumnsType<any> = cacheStatus.includes(status as Statuses)
    ? [
        {
          title: '',
          dataIndex: '',
          render: (value, record) => {
            return (
              <Box flexDirection='column'>
                <S.MobileTableItem>
                  <span className='item__title'>{t('common.dest_account_sheba_number')}</span>
                  <span className='item__value'>{getValueOrDash(record.destAccountNumber)}</span>
                </S.MobileTableItem>
                <S.MobileTableItem>
                  <span className='item__title'>{t('common.dest_account_owner_name')}</span>
                  <span className='item__value'>{getValueOrDash(record.destAccountName)}</span>
                </S.MobileTableItem>
                <S.MobileTableItem>
                  <span className='item__title'>{t('field.national_Identifier')}</span>
                  <span className='item__value'>{getValueOrDash(record.ssn)}</span>
                </S.MobileTableItem>
                <S.MobileTableItem>
                  <span className='item__title'>{t('field.deposit_id')}</span>
                  <span className='item__value'>{getValueOrDash(record.depositId)}</span>
                </S.MobileTableItem>
                <S.MobileTableItem>
                  <span className='item__title'>{t('field.amount')}</span>
                  <span className='item__value'>
                    {record.amount ? `${addThousandSeparator(record.amount)} ${t('common.rial')}` : '-'}
                  </span>
                </S.MobileTableItem>
                <S.MobileTableItem>
                  <span className='item__title'>{t('common.reason')}</span>
                  <span className='item__value'>{getValueOrDash(record.purpose)}</span>
                </S.MobileTableItem>

                {serviceUrl === 'inquiry-details' && pathname.includes('/list-requests') ? (
                  <>
                    <S.MobileTableItem>
                      <span className='item__title'>{t('field.status')}</span>
                      <S.StatusWrapper className={getStatusClassName(record?.requestDetailsStatus)}>
                        {getValueOrDash(record.requestDetailStatusTitle)}
                      </S.StatusWrapper>
                    </S.MobileTableItem>
                    <S.MobileTableItem>
                      <span className='item__title'>{t('field.transaction_description')}</span>
                      <span className='item__value'>{getValueOrDash(record.requestDetailStatusDesc)}</span>
                    </S.MobileTableItem>
                  </>
                ) : null}
              </Box>
            );
          },
        },
      ]
    : [
        {
          title: '',
          dataIndex: '',
          render: (value, record) => {
            return (
              <Box flexDirection='column'>
                <S.MobileTableItem>
                  <span className='item__title'>{t('common.dest_account_sheba_number')}</span>
                  <span className='item__value'>{getValueOrDash(record.counterPartyAccount)}</span>
                </S.MobileTableItem>
                <S.MobileTableItem>
                  <span className='item__title'>{t('common.dest_account_owner_name')}</span>
                  <span className='item__value'>{getValueOrDash(record.counterPartyName)}</span>
                </S.MobileTableItem>
                <S.MobileTableItem>
                  <span className='item__title'>{t('field.deposit_id')}</span>
                  <span className='item__value'>{getValueOrDash(record.depositId)}</span>
                </S.MobileTableItem>
                <S.MobileTableItem>
                  <span className='item__title'>{t('common.reason')}</span>
                  <span className='item__value'>{getValueOrDash(record.reason)}</span>
                </S.MobileTableItem>
                <S.MobileTableItem>
                  <span className='item__title'>{t('field.amount')}</span>
                  <span className='item__value'>
                    {record.amount ? `${addThousandSeparator(record.amount)} ${t('common.rial')}` : '-'}
                  </span>
                </S.MobileTableItem>
                <S.MobileTableItem>
                  <span className='item__title'>{t('field.national_Identifier')}</span>
                  <span className='item__value'>{getValueOrDash(record.purpose)}</span>
                </S.MobileTableItem>

                {serviceUrl === 'inquiry-details' &&
                pathname.includes('/list-requests') &&
                !cacheStatus.includes(status as Statuses) ? (
                  <>
                    <S.MobileTableItem>
                      <span className='item__title'>{t('field.status')}</span>
                      <S.StatusWrapper className={getStatusClassName(record?.requestDetailsStatus)}>
                        {getValueOrDash(record.requestDetailStatusTitle)}
                      </S.StatusWrapper>
                    </S.MobileTableItem>
                    <S.MobileTableItem>
                      <span className='item__title'>{t('field.transaction_description')}</span>
                      <span className='item__value'>{getValueOrDash(record.requestDetailStatusDesc)}</span>
                    </S.MobileTableItem>
                    <S.MobileTableItem>
                      <span className='item__title'>{t('receive_receipt')}</span>
                      <span className='item__value'>
                        <DownloadIcon onClick={() => downloadReceipt(record?.detailsId)} />
                      </span>
                    </S.MobileTableItem>
                  </>
                ) : null}
              </Box>
            );
          },
        },
      ];

  const columns: ColumnsType<any> = cacheStatus.includes(status as Statuses)
    ? [
        {
          title: '#',
          dataIndex: 'id',
          align: 'center',
          render: (text, record, index) => {
            return paginationStore.page * paginationStore.size + index + 1;
          },
        },
        {
          title: t('common.dest_account_sheba_number'),
          dataIndex: 'destAccountNumber',
          align: 'center',
          render: (value) => getValueOrDash(value),
        },
        {
          title: t('common.account_holder'),
          dataIndex: 'destAccountName',
          align: 'center',
          render: (value) => getValueOrDash(value),
        },
        {
          title: t('field.national_Identifier'),
          dataIndex: 'ssn',
          align: 'center',
          render: (value) => getValueOrDash(value),
        },
        {
          title: t('field.deposit_id'),
          dataIndex: 'depositId',
          align: 'center',
          render: (value) => getValueOrDash(value),
        },
        {
          title: t('field.trace_code'),
          dataIndex: 'traceNumber',
          align: 'center',
          render: (value) => getValueOrDash(value),
        },
        {
          title: t('common.reason'),
          dataIndex: 'purpose',
          align: 'center',
          render: (value) => getValueOrDash(value),
        },

        {
          title: t('field.amount_dest'),
          dataIndex: 'amount',
          align: 'center',
          render: (value) => {
            return value ? `${addThousandSeparator(value)}` : '-';
          },
        },
      ]
    : [
        {
          title: '#',
          dataIndex: 'id',
          align: 'center',
          render: (text, record, index) => {
            return data?.pageable?.offset + index + 1;
          },
        },
        {
          title: t('common.dest_account_sheba_number'),
          dataIndex: 'counterPartyAccount',
          align: 'center',
          render: (value) => getValueOrDash(value),
        },
        {
          title: t('common.account_holder'),
          dataIndex: 'counterPartyName',
          align: 'center',
          render: (value) => getValueOrDash(value),
        },
        {
          title: t('field.national_Identifier'),
          dataIndex: 'counterPartySsn',
          align: 'center',
          render: (value) => getValueOrDash(value),
        },
        {
          title: t('field.deposit_id'),
          dataIndex: 'depositId',
          align: 'center',
          render: (value) => getValueOrDash(value),
        },
        {
          title: t('field.trace_code'),
          dataIndex: 'traceNumber',
          align: 'center',
          render: (value) => getValueOrDash(value),
        },
        {
          title: t('common.reason'),
          dataIndex: 'reason',
          align: 'center',
          render: (value) => getValueOrDash(value),
        },

        {
          title: t('field.amount_dest'),
          dataIndex: 'amount',
          align: 'center',
          render: (value) => {
            return value ? `${addThousandSeparator(value)}` : '-';
          },
        },
      ];

  if (
    serviceUrl === 'inquiry-details' &&
    pathname.includes('/list-requests') &&
    !cacheStatus.includes(status as Statuses)
  ) {
    columns.push(
      {
        title: t('field.status'),
        dataIndex: 'requestDetailsStatusTitle',
        align: 'center',
        render: (value, record) => (
          <S.StatusWrapper className={getStatusClassName(record?.requestDetailsStatus)}>
            {getValueOrDash(value)}
          </S.StatusWrapper>
        ),
      },
      {
        title: t('receive_receipt'),
        dataIndex: 'detailsId',
        align: 'center',
        render: (value) => {
          // return <DownloadIcon onClick={() => downloadReceipt(value)} />;
          return (
            <Button
              style={{ border: 'none', width: '100%' }}
              loading={value === downloadingId}
              icon={<DownloadIcon />}
              onClick={() => downloadReceipt(value)}
            ></Button>
          );
        },
      }
    );
  }

  const columnsOfflineAch: ColumnsType<any> = [
    {
      title: '#',
      dataIndex: 'id',
      align: 'center',
      render: (text, record, index) => {
        return paginationStore.page * paginationStore.size + index + 1;
      },
    },
    {
      title: t('common.dest_iban_number'),
      dataIndex: 'destinationAccountNumber',
      align: 'center',
      render: (value) => getValueOrDash(value),
    },
    {
      title: t('common.dest_iban_owner_name'),
      dataIndex: 'destinationAccountOwnerName',
      align: 'center',
      render: (value) => getValueOrDash(value),
    },
    {
      title: t('common.deposit_description'),
      dataIndex: 'purpose',
      align: 'center',
      render: (value) => getValueOrDash(value),
    },
    {
      title: t('common.deposit_amount_rial'),
      dataIndex: 'amount',
      align: 'center',
      render: (value) => {
        return value ? `${addThousandSeparator(value)}` : '-';
      },
    },
    // {
    //   title: t('field.status'),
    //   dataIndex: 'traceNumber',
    //   align: 'center',
    //   render: (value) => getValueOrDash(value),
    // }
  ];

  const mobileColumnsOfflineAch: ColumnsType<any> = [
    {
      title: '',
      dataIndex: '',

      render: (value, record, expandIcon) => {
        return (
          <Box flexDirection='column'>
            {/* <S.MobileTableItem>
              <span className='item__title'>{t('field.status')}</span>
              <span className='item__value'>
                <S.StatusWrapper className={getStatusClassName(record?.status)}>
                  {getValueOrDash(record?.requestStatusTitle)}
                </S.StatusWrapper>
              </span>
            </S.MobileTableItem> */}
            <S.MobileTableItem>
              <span className='item__title'>{t('common.dest_iban_number')}</span>
              <span className='item__value'>{addThousandSeparator(record?.destinationAccountNumber)}</span>
            </S.MobileTableItem>
            <S.MobileTableItem>
              <span className='item__title'>{t('common.dest_iban_owner_name')}</span>
              <span className='item__value'>{getValueOrDash(record?.destinationAccountOwnerName)}</span>
            </S.MobileTableItem>
            <S.MobileTableItem>
              <span className='item__title'>{t('common.deposit_amount_rial')}</span>
              <span className='item__value'>{getValueOrDash(addThousandSeparator(record?.amount))}</span>
            </S.MobileTableItem>
            <S.MobileTableItem>
              <span className='item__title'>{t('common.deposit_description')}</span>
              <span className='item__value'>{getValueOrDash(record.purpose)}</span>
            </S.MobileTableItem>
          </Box>
        );
      },
    },
  ];

  const handleTableChange = (pagination) => {
    // console.log(pagination);
    const current = pagination.current;
    const size = pagination.pageSize;

    const paginationInfo = {
      ...paginationStore,
      current: current,
      page: current - 1,
      size: size,
    };
    setPagination(paginationInfo);
  };

  const showErrorMessage = () => {
    return (
      <MessageBox
        type={error?.type || downloadErrorMessage?.type}
        message={
          error?.shouldTranslate || downloadErrorMessage?.shouldTranslate
            ? t(error?.txt || downloadErrorMessage?.txt)
            : error?.txt || downloadErrorMessage?.txt
        }
        subErrors={error?.subErrors || downloadErrorMessage?.subErrors}
        closable
        shouldScroll
        style={{ margin: '1rem 3.2rem' }}
      />
    );
  };

  const handleStatusChange = (_, option) => {
    setFilter({ status: option });
  };

  const getPurposes = () => {
    const result: SelectProps['options'] = [];
    const data = dataPurpose ?? purposes;
    data?.map((item) => {
      return result.push({
        value: item?.statementCode?.toString().trim(),
        label: item?.titleFA?.toString().trim(),
      });
    });
    return result ?? [];
  };

  const removeFilterItem = () => {
    resetFormExcept(form, FORM_ITEM_NAMES, mainInputNames);
  };

  const getPaymentStatusTitles = (dataStatus: RequestStatus[]) => {
    const newDataValues = new Set();
    return dataStatus
      ?.filter((item) => !newDataValues?.has(item.code) && newDataValues.add(item.code))
      ?.map((item) => ({ value: item.code, label: item.persianTitle }));
  };

  const handleClickFilter = () => {
    setIsFilterActive(!isFilterActive);
  };

  const onFinish = async (values: any) => {
    setPagination({ ...paginationStore, page: 0 });
    await setFilter({ ...values });
    refetch();
  };

  const isFilterFilled = () => {
    return !isEmptyObjectValues(filter, [FORM_ITEM_NAMES.destinationAccount]);
  };

  return (
    <>
      {(downloadErrorMessage || isError) && showErrorMessage()}
      <S.FilterContainer>
        <Form form={form} layout='vertical' onFinish={onFinish}>
          <S.Search>
            <Form.Item
              className={'half-width'}
              name={FORM_ITEM_NAMES.destinationAccount}
              label={
                requestType === 'OFFLINE_ACH'
                  ? t('file_details_table.account_holder_Name_number_ach')
                  : t('file_details_table.account_holder_Name_number')
              }
            >
              <Input
                placeholder={
                  requestType === 'OFFLINE_ACH'
                    ? t('file_details_table.account_holder_name_number_placeholder')
                    : t('file_details_table.account_holder_Name_number')
                }
                allowClear
              />
            </Form.Item>
            <Box className='filter-box' alignItems='center' justifyContent='space-between'>
              <Box className='filter' marginTop={'0.6rem'}>
                {!cacheStatus.includes(status as Statuses) && requestType !== 'OFFLINE_ACH' && (
                  <FilterButton
                    size='large'
                    width={0}
                    onClick={handleClickFilter}
                    active={isFilterActive}
                    showBadge={isFilterFilled()}
                  />
                )}
                <Button
                  className='filter-button'
                  style={{ minWidth: '12rem' }}
                  htmlType='submit'
                  type='primary'
                  size='large'
                  loading={isFetching}
                  onClick={() => {
                    resetMessage();
                    resetDownloadErrorMessage();
                  }}
                >
                  {t('search')}
                </Button>
              </Box>

              {isFilterActive && (
                <Box justifyContent='flex-end'>
                  <Button className='remove-filter' type='text' color='primary' onClick={removeFilterItem}>
                    {t('remove_filter')}
                  </Button>
                </Box>
              )}
            </Box>

            {isFilterActive && (
              <>
                <Form.Item layout='vertical' label={t('field.trace_code')} name={FORM_ITEM_NAMES.traceCode}>
                  <Input allow={'number'} placeholder={t('trace_filter')} />
                </Form.Item>
                <Form.Item label={t('status')} name={FORM_ITEM_NAMES.requestStatus}>
                  <Select
                    options={getPaymentStatusTitles(dataStatus)}
                    defaultValue={t('all')}
                    allowClear
                    placeholder={t('all')}
                  />
                </Form.Item>

                <Form.Item layout='vertical' label={t('label.deposit_id')} name={FORM_ITEM_NAMES.deposit_id}>
                  <Input allow={'number'} placeholder={t('placeholder.deposit_id')} />
                </Form.Item>
                <Form.Item label={t('label.purpose')} name={FORM_ITEM_NAMES.purpose}>
                  {/* <Select options={getPaymentStatusTitles(purposes)} defaultValue={t('all')} allowClear placeholder={t('all')} /> */}
                  <Select
                    options={getPurposes()}
                    allowClear
                    // onChange={handlePurposeChange}
                    placeholder={t('all')}
                    loading={purposesLoading}
                  />
                </Form.Item>
                <div className='filter-row'>
                  <Form.Item className='full-width' label={t('from_amount')} name={FORM_ITEM_NAMES.fromAmount}>
                    <Input.Money placeholder={t('from_amount')} showLetter={false} />
                  </Form.Item>

                  <Form.Item className='full-width' label={t('to_amount')} name={FORM_ITEM_NAMES.toAmount}>
                    <Input.Money placeholder={t('to_amount')} showLetter={false} />
                  </Form.Item>
                </div>
                <Form.Item layout='vertical' label={t('label.national_id')} name={FORM_ITEM_NAMES.userSSN}>
                  <Input allow={'number'} placeholder={t('placeholder.national_id')} />
                </Form.Item>
              </>
            )}
          </S.Search>
        </Form>
      </S.FilterContainer>
      {isMobileOrTablet && (
        <S.ListNumber className='list'>
          {t('transaction_modal.list')}- {data?.totalElements} {t('transaction_modal.number')}
        </S.ListNumber>
      )}
      <Table
        dataSource={data?.content}
        columns={requestType === 'ONLINE' ? columns : columnsOfflineAch}
        mobileColumns={requestType === 'ONLINE' ? mobileColumns : mobileColumnsOfflineAch}
        hasContainer={false}
        loading={isFetching}
        onChange={handleTableChange}
        total={data?.totalElements}
        current={paginationStore?.current}
        rowKey={'id'}
      />
    </>
  );
};
