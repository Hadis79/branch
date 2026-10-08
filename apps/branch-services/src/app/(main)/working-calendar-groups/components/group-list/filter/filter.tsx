import { Form } from 'antd';

import { useTr } from '@branch-services/translation';
import { Box, Button, Input, SearchItemsContainer, Select } from '@branch-services/ui-kit';

import { FilterWrapper } from './filter.style';
import useGroupStore, { GroupListFilter } from '../../../store/use-widget-store';
import { GROUP_TYPE_FILTER_OPTIONS } from '../../../utils/constants';

type FilterProps = {
  isFetching: boolean;
  onRefetch: () => void;
};

const Filter = ({ isFetching, onRefetch }: FilterProps) => {
  const [t] = useTr();
  const [form] = Form.useForm<GroupListFilter>();

  const filter = useGroupStore((state) => state.filter);
  const page = useGroupStore((state) => state.pagination.page);
  const setFilter = useGroupStore((state) => state.setFilter);
  const setPagination = useGroupStore((state) => state.setPagination);
  const onFinish = (values: GroupListFilter) => {
    // Same search again keeps the query key, so the (still fresh) result has to be refetched explicitly
    const isSameQuery =
      page === 1 &&
      (values.name?.trim() || '') === (filter.name?.trim() || '') &&
      (values.groupType || '') === (filter.groupType || '');
    if (isSameQuery) {
      onRefetch();
      return;
    }

    setFilter(values);
    setPagination({ page: 1 });
  };
  return (
    <FilterWrapper>
      <Form form={form} onFinish={onFinish} layout='vertical'>
        <SearchItemsContainer>
          <Form.Item layout='vertical' label={t('group_name')} name='name'>
            <Input allowClear placeholder={t('group_name_placeholder')} />
          </Form.Item>
          <Form.Item layout='vertical' label={t('group_type')} name='groupType'>
            <Select
              options={GROUP_TYPE_FILTER_OPTIONS.map(({ value, label }) => ({ value, label: t(label) }))}
              placeholder={t('group_type_placeholder')}
            />
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
