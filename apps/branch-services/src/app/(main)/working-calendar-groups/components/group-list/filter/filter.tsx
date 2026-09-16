import { Form } from 'antd';

import { useTr } from '@branch-services/translation';
import { Box, Button, Input, SearchItemsContainer } from '@branch-services/ui-kit';

import { FilterWrapper } from './filter.style';
import useGroupStore from '../../../store/use-widget-store';
import useGroupListQuery from '../../../queries/use-group-list-query';

const Filter = () => {
  const [t] = useTr();
  const [form] = Form.useForm();

  const setFilter = useGroupStore((state) => state.setFilter);
  const { refetch, isFetching } = useGroupListQuery();

  const onFinish = async (values: any) => {
    await setFilter(values);
    refetch();
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
              <Button htmlType='submit' type='primaryOutlined' loading={isFetching} style={{ minWidth: '12rem' }}>
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
