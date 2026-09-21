import { Form } from 'antd';

import { useTr } from '@branch-services/translation';
import { Box, Button, Input, SearchItemsContainer } from '@branch-services/ui-kit';

import useServicesQuery from '../../../queries/use-services-query';
import useServiceStore from '../../../store/use-widget-store';
import type { ServiceListFilter } from '../../../utils/types';

const ServiceFilter = () => {
  const [t] = useTr();
  const [form] = Form.useForm<ServiceListFilter>();
  const filter = useServiceStore((state) => state.filter);
  const page = useServiceStore((state) => state.pagination.page);
  const setFilter = useServiceStore((state) => state.setFilter);
  const { isFetching, refetch } = useServicesQuery();

  const handleSearch = ({ name }: ServiceListFilter) => {
    const nextName = name?.trim() || undefined;

    // Same search keeps the query key, so the result has to be refetched explicitly
    if (nextName === filter.name && page === 1) {
      refetch();
      return;
    }

    setFilter({ name: nextName });
  };

  return (
    <Box padding='2.8rem 3.2rem 4rem' flexDirection='column'>
      <Form form={form} layout='vertical' initialValues={filter} onFinish={handleSearch}>
        <SearchItemsContainer>
          <Form.Item name='name' label={t('service_name')}>
            <Input allowClear placeholder={t('service_name_placeholder')} />
          </Form.Item>
          <Box alignItems='center'>
            <Button htmlType='submit' style={{ width: 'fit-content' }} type='primaryOutlined' loading={isFetching}>
              {t('search')}
            </Button>
          </Box>
        </SearchItemsContainer>
      </Form>
    </Box>
  );
};

export default ServiceFilter;
