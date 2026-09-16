import React from 'react';
import { Form, TablePaginationConfig } from 'antd';
import { Button, ColumnsType, EmptyData, Input, MessageBox, Table } from '@branch-services/ui-kit';
import { useTr } from '@branch-services/translation';
import { datetimeLocale, getValueOrDash } from '@branch-services/utils';
import useOrganizationCodeStore from '../../store/use-widget-store';
import useOrganizationCodesQuery from '../../queries/use-organization-codes-query';
import { OrganizationCodeFilters, OrganizationCodeRow } from '../../utils/types';
import { NATIONAL_ID_LENGTH, ORGANIZATION_CODE_LENGTH } from '../../utils/constants';
import { getOrganizationCodeErrorMessage, normalizeDigits } from '../../utils/utils';
import EditOrganizationCodeModal from '../edit-organization-code-modal/edit-organization-code-modal';
import DeleteOrganizationCodeModal from '../delete-organization-code-modal/delete-organization-code-modal';
import * as S from './organization-code-list.style';

const OrganizationCodeList = () => {
  const [t] = useTr();
  const [form] = Form.useForm<OrganizationCodeFilters>();
  const { filter, pagination, setFilter, setPagination, openModal } = useOrganizationCodeStore();
  const { data, error, isError, isLoading, isFetching, refetch } = useOrganizationCodesQuery();

  const columns: ColumnsType<OrganizationCodeRow> = [
    {
      title: '#',
      align: 'center',
      width: 70,
      render: (_value, _record, index) => (data?.pageable.offset ?? 0) + index + 1,
    },
    {
      title: t('creation_date'),
      dataIndex: 'createdOn',
      align: 'center',
      width: 160,
      render: (value) => (value ? datetimeLocale(value) : '-'),
    },
    {
      title: t('national_id'),
      dataIndex: 'ssn',
      align: 'center',
      width: 160,
    },
    {
      title: t('organization_code'),
      dataIndex: 'organizationCode',
      align: 'center',
      width: 160,
    },
    {
      title: t('organization_name'),
      dataIndex: 'organizationName',
      align: 'center',
      width: 160,
    },
    {
      title: t('account_number'),
      dataIndex: 'accountNumber',
      align: 'center',
      width: 190,
      render: (value) => getValueOrDash(value),
    },
    {
      title: t('actions'),
      key: 'actions',
      align: 'center',
      width: 190,
      render: (_value, record) => (
        <S.ActionGroup>
          <Button type='link' onClick={() => openModal('edit', record)}>
            {t('edit')}
            <i className='ri-edit-line' />
          </Button>
          <Button className='delete-action' danger type={'table'} onClick={() => openModal('delete', record)}>
            {t('delete')}
            <i className='ri-delete-bin-line' />
          </Button>
        </S.ActionGroup>
      ),
    },
  ];

  const handleTableChange = (nextPagination: TablePaginationConfig) => {
    const size = nextPagination.pageSize ?? pagination.size;
    const pageSizeChanged = size !== pagination.size;

    setPagination({
      page: pageSizeChanged ? 1 : nextPagination.current ?? 1,
      size,
    });
  };

  const handleSearch = (values: OrganizationCodeFilters) => {
    const nextFilter: OrganizationCodeFilters = {
      ssn: normalizeDigits(values.ssn).trim() || undefined,
      organizationCode: normalizeDigits(values.organizationCode).trim() || undefined,
    };
    const isSameFilter = filter.ssn === nextFilter.ssn && filter.organizationCode === nextFilter.organizationCode;

    if (isSameFilter && pagination.page === 1) {
      void refetch();
      return;
    }

    setFilter(nextFilter);
  };

  const errorMessage = isError ? getOrganizationCodeErrorMessage(error) : null;
  // const shouldShowResults = !isError || Boolean(data?.content.length);

  return (
    <>
      {errorMessage && (
        <MessageBox
          message={errorMessage.shouldTranslate ? t(errorMessage.txt) : errorMessage.txt}
          type={errorMessage.type}
          subErrors={errorMessage.subErrors}
          style={{ margin: '0 3.2rem 2rem ' }}
          shouldScroll
        />
      )}

      <S.SearchSection>
        <Form form={form} layout='vertical' initialValues={filter} onFinish={handleSearch}>
          <S.SearchGrid>
            <Form.Item name='ssn' label={t('national_id')}>
              <Input
                allow='number'
                allowClear
                maxLength={NATIONAL_ID_LENGTH}
                placeholder={t('national_id_placeholder')}
              />
            </Form.Item>
            <Form.Item name='organizationCode' label={t('organization_code')}>
              <Input
                allow='number'
                allowClear
                maxLength={ORGANIZATION_CODE_LENGTH}
                placeholder={t('organization_code_placeholder')}
              />
            </Form.Item>
            <S.SearchButtonRow>
              <Button htmlType='submit' type='primary' loading={isFetching} disabled={isFetching}>
                {t('search')}
              </Button>
            </S.SearchButtonRow>
          </S.SearchGrid>
        </Form>
      </S.SearchSection>

      <Table
        minHeight='24rem'
        columns={columns}
        dataSource={data?.content ?? []}
        rowKey='organizationCodeUUID'
        bordered={false}
        hasContainer={false}
        loading={isLoading || isFetching}
        current={pagination.page}
        total={data?.totalElements}
        pagination={{
          current: pagination.page,
          pageSize: pagination.size,
        }}
        onChange={handleTableChange}
        locale={{ emptyText: <EmptyData description={t('no_records')} /> }}
      />

      <EditOrganizationCodeModal />
      <DeleteOrganizationCodeModal shouldGoToPreviousPage={data?.numberOfElements === 1} />
    </>
  );
};

export default OrganizationCodeList;
