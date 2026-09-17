import { Form, TablePaginationConfig } from 'antd';

import { useAppTheme } from '@branch-services/hooks';
import { useTr } from '@branch-services/translation';
import {
  Box,
  Button,
  ColumnsType,
  EmptyData,
  Input,
  MessageBox,
  SearchItemsContainer,
  Table,
  Text,
} from '@branch-services/ui-kit';
import { ApiUtil } from '@branch-services/utils';

import useServicesQuery from '../../queries/use-services-query';
import useServiceStore from '../../store/use-widget-store';
import type { ServiceItem, ServiceListFilter } from '../../utils/types';

const ServiceList = () => {
  const [t] = useTr();
  const theme = useAppTheme();
  const [form] = Form.useForm<ServiceListFilter>();
  const filter = useServiceStore((state) => state.filter);
  const pagination = useServiceStore((state) => state.pagination);
  const setFilter = useServiceStore((state) => state.setFilter);
  const setPagination = useServiceStore((state) => state.setPagination);
  const openModal = useServiceStore((state) => state.openModal);
  const { data, error, isPending, isFetching, refetch } = useServicesQuery();

  const errorMessage = error ? ApiUtil.getErrorMessage(error) : null;
  const isEmpty = !isPending && !error && !data?.totalElements && !filter.name;

  const handleSearch = ({ name }: ServiceListFilter) => {
    const nextName = name?.trim() || undefined;

    // Same search keeps the query key, so the result has to be refetched explicitly
    if (nextName === filter.name && pagination.page === 1) {
      refetch();
      return;
    }

    setFilter({ name: nextName });
  };

  const handleTableChange = ({ current = 1, pageSize = pagination.size }: TablePaginationConfig) => {
    setPagination({ size: pageSize, page: pageSize === pagination.size ? current : 1 });
  };

  const columns: ColumnsType<ServiceItem> = [
    {
      title: '#',
      key: 'row',
      align: 'center',
      width: 70,
      render: (_value, _record, index) => (pagination.page - 1) * pagination.size + index + 1,
    },
    { title: t('service_name'), dataIndex: 'name', align: 'center' },
    { title: t('service_english_name'), dataIndex: 'englishName', align: 'center' },
    {
      title: t('status'),
      dataIndex: 'active',
      align: 'center',
      render: (active: boolean) => (
        <Text as='span' color={active ? theme.success : theme.error}>
          {t(active ? 'active' : 'inactive')}
        </Text>
      ),
    },
    {
      title: t('actions'),
      key: 'actions',
      align: 'center',
      width: 140,
      render: (_value, service) => (
        <Button type='link' onClick={() => openModal('edit', service)}>
          {t('edit')}
          <i className='ri-edit-line' />
        </Button>
      ),
    },
  ];

  if (isEmpty) {
    return (
      <Box flexDirection='column' alignItems='center' gap='2.4rem' padding='3.2rem'>
        <EmptyData description={t('no_services')} />
        <Button type='primary' icon={<i className='ri-add-line' />} onClick={() => openModal('create')}>
          {t('new_service')}
        </Button>
      </Box>
    );
  }

  return (
    <Box flexDirection='column' width='100%'>
      {errorMessage && (
        <MessageBox
          message={errorMessage.shouldTranslate ? t(errorMessage.txt) : errorMessage.txt}
          type={errorMessage.type}
          subErrors={errorMessage.subErrors}
          margin='2.4rem 3.2rem 0'
        />
      )}
      <Box padding='2.8rem 3.2rem 4rem' flexDirection='column'>
        <Form form={form} layout='vertical' initialValues={filter} onFinish={handleSearch}>
          <SearchItemsContainer>
            <Form.Item className='half-width' name='name' label={t('service_name')}>
              <Input allowClear placeholder={t('service_name_placeholder')} />
            </Form.Item>
            <Box alignItems='center'>
              <Button htmlType='submit' type='primaryOutlined' loading={isFetching}>
                {t('search')}
              </Button>
            </Box>
          </SearchItemsContainer>
        </Form>
      </Box>
      <Table
        loading={isFetching}
        dataSource={data?.content}
        columns={columns}
        mobileColumns={columns}
        onChange={handleTableChange}
        hasContainer={false}
        total={data?.totalElements}
        current={pagination.page}
        pagination={{
          current: pagination.page,
          pageSize: pagination.size,
        }}
        locale={{ emptyText: <EmptyData description={t('no_matching_services')} /> }}
        rowKey='id'
      />
    </Box>
  );
};

export default ServiceList;
