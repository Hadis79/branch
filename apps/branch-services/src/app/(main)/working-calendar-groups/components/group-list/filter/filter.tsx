import { Form } from 'antd';

import { useTr } from '@branch-services/translation';
import { Box, Button, Input, SearchItemsContainer } from '@branch-services/ui-kit';

import { FilterWrapper } from './filter.style';
import useGroupStore, { GroupListFilter } from '../../../store/use-widget-store';
import useGroupListQuery from '../../../queries/use-group-list-query';

const Filter = () => {
  const [t] = useTr();
  const [form] = Form.useForm<GroupListFilter>();

  const filter = useGroupStore((state) => state.filter);
  const page = useGroupStore((state) => state.pagination.page);
  const setFilter = useGroupStore((state) => state.setFilter);
  const setPagination = useGroupStore((state) => state.setPagination);
  const { refetch, isFetching } = useGroupListQuery();

  const onFinish = (values: GroupListFilter) => {
    // Same search again keeps the query key, so the (still fresh) result has to be refetched explicitly
    const isSameQuery = page === 1 && (values.name?.trim() || '') === (filter.name?.trim() || '');
    if (isSameQuery) {
      refetch();
      return;
    }

    setFilter(values);
    setPagination({ page: 1 });
  };
  return (
    <FilterWrapper>
      <Form form={form} onFinish={onFinish} layout='vertical'>
        <SearchItemsContainer>
          <Form.Item className={'half-width'} layout='vertical' label={t('group_name')} name='name'>
            <Input allowClear placeholder={t('group_name_placeholder')} />
          </Form.Item>
          <Box alignItems='center' justifyContent='space-between'>
            <Box>
              <Button htmlType='submit' type='primaryOutlined' loading={isFetching}>
                {t('field.search')}
              </Button>
            </Box>
          </Box>
        </SearchItemsContainer>
      </Form>
    </FilterWrapper>
  );
};

export default Filter;
