import React, { useEffect } from 'react';
import { Box, Button, ColumnsType, Input, MessageBox, SearchItemsContainer, Table } from '@branch-services/ui-kit';
import { useTr } from '@branch-services/translation';
import { addThousandSeparator, getValueOrDash } from '@branch-services/utils';

import { Form } from 'antd';
import { useForm } from 'antd/es/form/Form';
import useUserFileDetailsQuery from '../../queries/use-get-user-file-details';
import * as S from '../file-details/file-details.style';
import useNewRequestsWidgetStore from '../../store/use-widget-store';
import { USER_FILE_DETAILS_FORM_ITEM_NAMES } from '../../utils/consts';

export const FileDetailsTable: React.FC<any> = ({ requestId }) => {
  const [form] = useForm();
  const [t] = useTr();
  const {
    pagination: paginationStore,
    setPagination,
    setFileDetailsFilter,
    resetPagination,
    resetFileDetailsFilter,
    message,
    resetMessage,
  } = useNewRequestsWidgetStore();

  const { data, isFetching, refetch } = useUserFileDetailsQuery({ requestId });

  useEffect(() => {
    return () => {
      resetFileDetailsFilter();
      resetPagination();
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
              <span className='item__value'>{getValueOrDash(record.destAccountNumber)}</span>
            </S.MobileTableItem>
            <S.MobileTableItem>
              <span className='item__title'>{t('common.dest_account_owner_name')}</span>
              <span className='item__value'>{getValueOrDash(record.destAccountName)}</span>
            </S.MobileTableItem>
            <S.MobileTableItem>
              <span className='item__title'>{t('field.deposit_id')}</span>
              <span className='item__value'>{getValueOrDash(record.depositId)}</span>
            </S.MobileTableItem>
            <S.MobileTableItem>
              <span className='item__title'>{t('common.reason')}</span>
              <span className='item__value'>{getValueOrDash(record.purpose)}</span>
            </S.MobileTableItem>
            <S.MobileTableItem>
              <span className='item__title'>{t('field.national_Identifier')}</span>
              <span className='item__value'>{getValueOrDash(record.ssn)}</span>
            </S.MobileTableItem>
            <S.MobileTableItem>
              <span className='item__title'>{t('field.amount')}</span>
              <span className='item__value'>
                {record.amount ? `${addThousandSeparator(record.amount)} ${t('common.rial')}` : '-'}
              </span>
            </S.MobileTableItem>
          </Box>
        );
      },
    },
  ];

  function calculateRow(index: number) {
    return paginationStore.page * paginationStore.size + index + 1;
  }

  const columns: ColumnsType<any> = [
    {
      title: '#',
      dataIndex: 'id',
      align: 'center',
      width: 100,
      render: (text, record, index) => {
        return calculateRow(index);
      },
    },
    {
      title: t('common.dest_account_sheba_number'),
      dataIndex: 'destAccountNumber',
      align: 'center',
      width: 300,
      render: (value) => getValueOrDash(value),
    },
    {
      title: t('common.dest_account_owner_name'),
      dataIndex: 'destAccountName',
      align: 'center',
      width: 300,
      render: (value) => getValueOrDash(value),
    },
    {
      title: t('common.reason'),
      dataIndex: 'purpose',
      align: 'center',
      width: 300,
      render: (value) => getValueOrDash(value),
    },

    {
      title: t('field.national_Identifier'),
      dataIndex: 'ssn',
      align: 'center',
      width: 300,
      render: (value) => getValueOrDash(value),
    },
    {
      title: `${t('deposit_amount')} (${t('common.rial')})`,
      dataIndex: 'amount',
      align: 'center',
      width: 300,
      render: (value) => {
        return value ? `${getValueOrDash(addThousandSeparator(value))} ` : '-';
      },
    },
  ];

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
  };

  const renderErrorMessageBox = () => {
    return (
      <>
        {message && (
          <MessageBox
            message={message?.shouldTranslate ? t(message?.txt) : message?.txt}
            type={message.type}
            subErrors={message?.subErrors}
            closable
            shouldScroll
            style={{ margin: '1.4rem 3.2rem 0' }}
            linkProps={
              message?.linkProps && {
                title: message?.linkProps?.title as string,
                url: message?.linkProps?.url as string,
              }
            }
            onClose={() => resetMessage()}
          />
        )}
      </>
    );
  };

  const onFinish = async (values: any) => {
    await setFileDetailsFilter({ ...values });
    refetch();
  };

  return (
    <>
      {message && renderErrorMessageBox()}
      <S.FilterContainer>
        <Form form={form} layout='vertical' onFinish={onFinish}>
          <SearchItemsContainer>
            <Form.Item
              className={'half-width'}
              name={USER_FILE_DETAILS_FORM_ITEM_NAMES.destAccNameOrNumber}
              label={t('file_details_table.account_holder_Name_number')}
            >
              <Input placeholder={t('file_details_table.account_holder_Name_number')} allowClear />
            </Form.Item>
            <Box className={'buttons-container'}>
              <Button htmlType='submit' type='primary' size='large' loading={isFetching}>
                {t('button.search')}
              </Button>
            </Box>
          </SearchItemsContainer>
        </Form>
      </S.FilterContainer>
      <Table
        dataSource={data?.content}
        columns={columns}
        mobileColumns={mobileColumns}
        hasContainer={false}
        loading={isFetching}
        onChange={handleOnChange}
        total={data?.totalElements}
        current={paginationStore?.current}
        rowKey={'id'}
      />
    </>
  );
};
