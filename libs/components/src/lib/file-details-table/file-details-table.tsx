import React, { useEffect } from 'react';
import {
  Box,
  Button,
  ColumnsType,
  Input,
  MessageBox,
  SearchItemsContainer,
  Select,
  Table,
} from '@branch-services/ui-kit';
import useFileDetailsQuery from './use-file-details-table-query';
import { useTr } from '@branch-services/translation';
import { addThousandSeparator, getValueOrDash } from '@branch-services/utils';

import useFileDetailsTableStore from './file-details-table-store';

import * as S from './file-details-table.style';
import { getStatusClassName } from '../utils/utils';
import { Props } from './types';
import { Form, Progress } from 'antd';
import { useForm } from 'antd/es/form/Form';
import useFileFilterDetailsQuery from './use-file-filter-query';
import { usePathname } from 'next/navigation';
import { useResponsive } from '@branch-services/hooks';

export const FileDetailsTable: React.FC<Props> = (props) => {
  const [t] = useTr();
  const pathname = usePathname();
  const { pagination, setPagination, filter, setFilter, resetFilter } = useFileDetailsTableStore();
  const { ssn, id, serviceUrl, uploadFile, queryStatus } = props;
  const [form] = useForm();
  const { isMobileOrTablet } = useResponsive();
  const { data: statuses, isLoading: statusLoading } = useFileFilterDetailsQuery({ uploadFile: uploadFile });
  const { data, error, isLoading, isError, refetch, isFetching } = useFileDetailsQuery({
    ssn: ssn,
    id: id,
    serviceUrl,
    size: pagination.size,
    page: pagination.page,
    filter: filter,
    uploadFile: uploadFile,
  });
  const FORM_ITEM_NAMES = {
    destinationAccount: 'destinationAccount',
    status: 'status',
  };

  useEffect(() => {
    setPagination({ ...pagination, page: 1 });
  }, [pagination.size]);

  useEffect(() => {
    return () => {
      setPagination({ size: 10, page: 1 });
      resetFilter();
    };
  }, []);

  const mobileColumns: ColumnsType<any> = [
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
              <span className='item__value'>{getValueOrDash(record.nationalCode)}</span>
            </S.MobileTableItem>

            {serviceUrl === 'inquiry-details' && pathname.includes('/batch-ach-history') ? (
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
  ];

  const mobileOfflinecolumns: ColumnsType<any> = [
    {
      title: '',
      dataIndex: '',
      render: (value, record, index) => {
        return (
          <Box flexDirection='column'>
            <S.MobileTableItem>
              <span className='item__title'>{t('common.dest_iban_number')}</span>
              <span className='item__value'>{getValueOrDash(record.destinationAccountNumber)}</span>
            </S.MobileTableItem>
            <S.MobileTableItem>
              <span className='item__title'>{t('common.dest_iban_owner_name')}</span>
              <span className='item__value'>{getValueOrDash(record.destinationAccountOwnerName)}</span>
            </S.MobileTableItem>
            <S.MobileTableItem>
              <span className='item__title'>{t('field.deposit_description')}</span>
              <span className='item__value'>{getValueOrDash(record.purpose)}</span>
            </S.MobileTableItem>
            <S.MobileTableItem>
              <span className='item__title'>{t('common.deposit_amount_rial')}</span>
              <span className='item__value'>{record.amount ? `${addThousandSeparator(record.amount)}` : '-'}</span>
            </S.MobileTableItem>
          </Box>
        );
      },
    },
  ];

  const onlineColumns: ColumnsType<any> = [
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
      title: t('common.dest_account_sheba_number'),
      dataIndex: 'counterPartyAccount',
      align: 'center',
      render: (value) => getValueOrDash(value),
    },
    {
      title: t('common.dest_account_owner_name'),
      dataIndex: 'counterPartyName',
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
      title: t('common.reason'),
      dataIndex: 'reason',
      align: 'center',
      render: (value) => getValueOrDash(value),
    },

    {
      title: t('field.national_Identifier'),
      dataIndex:
        serviceUrl === 'inquiry-details' && pathname.includes('/batch-ach-history')
          ? 'counterPartySsn'
          : 'nationalCode',
      align: 'center',
      render: (value) => getValueOrDash(value),
    },
    {
      title: t('field.amount'),
      dataIndex: 'amount',
      align: 'center',
      render: (value) => {
        return value ? `${addThousandSeparator(value)} ${t('common.rial')}` : '-';
      },
    },
    {
      title: t('field.iban_inquiry_name'),
      hidden: !queryStatus,
      dataIndex: 'ibanInquiryName',
      align: 'center',
      render: (value) => getValueOrDash(value),
    },
    {
      title: t('field.percentage'),
      hidden: !queryStatus,
      dataIndex: 'similarityPercentage',
      align: 'center',
      render: (value) => (
        <S.SimilarityPercentage>
          {value ? (
            <Progress
              type='circle'
              strokeColor={value === 100 ? 'green' : value >= 50 ? 'blue' : 'red'}
              size={'small'}
              percent={value}
            />
          ) : (
            '-'
          )}
        </S.SimilarityPercentage>
      ),
    },
  ];

  const offlineColomns: ColumnsType<any> = [
    {
      title: '#',
      dataIndex: 'excelRowIndex',
      align: 'center',
      width: 100,
      render: (text, record, index) => {
        return record?.excelRowIndex;
        // return index + 1;
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
  ];

  if (serviceUrl === 'inquiry-details' && pathname.includes('/batch-ach-history')) {
    onlineColumns.push(
      {
        title: t('field.status'),
        dataIndex: 'requestDetailStatusTitle',
        align: 'center',
        render: (value, record) => (
          <S.StatusWrapper className={getStatusClassName(record?.requestDetailsStatus)}>
            {getValueOrDash(value)}
          </S.StatusWrapper>
        ),
      },
      {
        title: t('field.transaction_description'),
        dataIndex: 'requestDetailStatusDesc',
        align: 'center',
        render: (value) => getValueOrDash(value),
      }
    );
  }

  const handleTableChange = (_pagination) => {
    const { current, pageSize } = _pagination;

    setPagination({ ...pagination, size: pageSize, page: current });
    // refetch();
  };

  const showErrorMessage = () => {
    return (
      <MessageBox
        type={error?.type}
        message={error?.shouldTranslate ? t(error?.txt) : error?.txt}
        subErrors={error?.subErrors}
        closable
        shouldScroll
        style={{ margin: '1rem 3.2rem' }}
      />
    );
  };

  const handleStatusChange = (_, option) => {
    setFilter({ status: option });
  };

  const onFinish = async (values: any) => {
    setPagination({ ...pagination, page: 1 });
    await setFilter({ ...values });
    refetch();
  };

  return (
    <>
      {isError && showErrorMessage()}
      <S.FilterContainer>
        <Form form={form} layout='vertical' onFinish={onFinish}>
          <SearchItemsContainer>
            <Form.Item
              className={'half-width'}
              name={FORM_ITEM_NAMES.destinationAccount}
              label={
                pathname === '/create-request-ach'
                  ? t('file_details_table.account_holder_Name_number_ach')
                  : t('file_details_table.account_holder_Name_number')
              }
            >
              <Input
                placeholder={
                  pathname === '/create-request-ach'
                    ? t('file_details_table.account_holder_name_number_placeholder')
                    : t('file_details_table.account_holder_Name_number')
                }
                allowClear
              />
            </Form.Item>
            {serviceUrl === 'inquiry-details' && pathname.includes('/batch-ach-history') ? (
              <Form.Item name={FORM_ITEM_NAMES.status} label={t('field.status')}>
                <Select
                  placeholder={t('common.all')}
                  onChange={handleStatusChange}
                  options={statuses}
                  loading={statusLoading}
                  allowClear
                />
              </Form.Item>
            ) : null}
            <Box className={'buttons-container'}>
              <Button htmlType='submit' type='primary' size='large' loading={isFetching}>
                {t('button.search')}
              </Button>
            </Box>
          </SearchItemsContainer>
        </Form>
      </S.FilterContainer>
      {isMobileOrTablet && (
        <S.ListNumber className='list'>
          {t('transaction_modal.list')}- {data?.totalElements} {t('transaction_modal.number')}
        </S.ListNumber>
      )}
      <Table
        dataSource={data?.content}
        columns={serviceUrl === 'details-ach' ? offlineColomns : onlineColumns}
        mobileColumns={serviceUrl === 'details-ach' ? mobileOfflinecolumns : mobileColumns}
        hasContainer={false}
        loading={isFetching}
        onChange={handleTableChange}
        total={data?.totalElements}
        current={pagination?.page}
        rowKey={'id'}
        style={isMobileOrTablet ? { padding: '2rem' } : undefined}
      />
    </>
  );
};
