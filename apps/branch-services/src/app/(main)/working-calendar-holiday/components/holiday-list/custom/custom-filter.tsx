import { Form } from 'antd';
import { useIsFetching, useQueryClient } from '@tanstack/react-query';

import { useTr } from '@branch-services/translation';
import { Box, Button, DatePicker, Input, SearchItemsContainer, Select } from '@branch-services/ui-kit';
import { Dayjs, dayjs } from '@branch-services/utils';

import useProvincesQuery from '../../../queries/use-provinces-query';
import useHolidayStore from '../../../store/use-widget-store';
import { toApiDate } from '../../../utils/utils';
import { holidayQueryKeys } from '../../../utils/constants';

type CustomFilterValues = { title?: string; provinceName?: string; fromDate?: Dayjs; toDate?: Dayjs };

const CustomFilter = () => {
  const [t] = useTr();
  const [form] = Form.useForm<CustomFilterValues>();
  const fromDate = Form.useWatch('fromDate', form);
  const filter = useHolidayStore((state) => state.customFilter);
  const setFilter = useHolidayStore((state) => state.setCustomFilter);
  const queryClient = useQueryClient();
  const isFetching = useIsFetching({ queryKey: holidayQueryKeys.customLists() }) > 0;
  const { data: provinceOptions, isFetching: isProvincesLoading } = useProvincesQuery();

  const initialValues: CustomFilterValues = {
    ...filter,
    fromDate: filter.fromDate ? dayjs(filter.fromDate) : undefined,
    toDate: filter.toDate ? dayjs(filter.toDate) : undefined,
  };

  const handleSearch = (values: CustomFilterValues) => {
    const next = {
      title: values.title?.trim() || undefined,
      provinceName: values.provinceName || undefined,
      fromDate: toApiDate(values.fromDate),
      toDate: toApiDate(values.toDate),
    };
    void queryClient.invalidateQueries({
      queryKey: holidayQueryKeys.customList(next),
      exact: true,
    });
    setFilter(next);
  };

  return (
    <Box padding='2.8rem 3.2rem 4rem' flexDirection='column'>
      <Form form={form} layout='vertical' initialValues={initialValues} onFinish={handleSearch}>
        <SearchItemsContainer>
          <Form.Item name='title' label={t('title')}>
            <Input allowClear placeholder={t('title_placeholder')} />
          </Form.Item>
          <Form.Item name='provinceName' label={t('region')}>
            <Select
              allowClear
              showSearch
              optionFilterProp='label'
              options={provinceOptions}
              loading={isProvincesLoading}
              placeholder={t('select_placeholder')}
            />
          </Form.Item>
          <Form.Item label={t('date')} className='half-width'>
            <Box gap='1.4rem'>
              <Form.Item name='fromDate' noStyle>
                <DatePicker placeholder={t('from_date')} />
              </Form.Item>
              <Form.Item name='toDate' noStyle>
                <DatePicker
                  placeholder={t('to_date')}
                  disabledDate={(current) => Boolean(fromDate && current.isBefore(fromDate, 'day'))}
                />
              </Form.Item>
            </Box>
          </Form.Item>
          <Box className='full-width buttons-container'>
            <Button htmlType='submit' style={{ width: 'fit-content' }} type='primaryOutlined' loading={isFetching}>
              {t('search')}
            </Button>
          </Box>
        </SearchItemsContainer>
      </Form>
    </Box>
  );
};

export default CustomFilter;
