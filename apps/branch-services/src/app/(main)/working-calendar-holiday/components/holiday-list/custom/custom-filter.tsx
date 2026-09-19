import { Form } from 'antd';

import { useTr } from '@branch-services/translation';
import { Box, Button, DatePicker, Input, SearchItemsContainer, Select } from '@branch-services/ui-kit';
import { Dayjs, dayjs } from '@branch-services/utils';

import useCustomHolidaysQuery from '../../../queries/use-custom-holidays-query';
import useRegionsQuery from '../../../queries/use-regions-query';
import useHolidayStore from '../../../store/use-widget-store';
import { isSameFilter, toApiDate } from '../../../utils/utils';

type CustomFilterValues = { title?: string; regionCode?: string; fromDate?: Dayjs; toDate?: Dayjs };

const CustomFilter = () => {
  const [t] = useTr();
  const [form] = Form.useForm<CustomFilterValues>();
  const fromDate = Form.useWatch('fromDate', form);
  const filter = useHolidayStore((state) => state.customFilter);
  const page = useHolidayStore((state) => state.customPagination.page);
  const setFilter = useHolidayStore((state) => state.setCustomFilter);
  const { isFetching, refetch } = useCustomHolidaysQuery();
  const { data: regionOptions, isFetching: isRegionsLoading } = useRegionsQuery();

  const initialValues: CustomFilterValues = {
    ...filter,
    fromDate: filter.fromDate ? dayjs(filter.fromDate) : undefined,
    toDate: filter.toDate ? dayjs(filter.toDate) : undefined,
  };

  const handleSearch = (values: CustomFilterValues) => {
    const next = {
      title: values.title?.trim() || undefined,
      regionCode: values.regionCode || undefined,
      fromDate: toApiDate(values.fromDate),
      toDate: toApiDate(values.toDate),
    };
    if (isSameFilter(next, filter) && page === 1) refetch();
    else setFilter(next);
  };

  return (
    <Box padding='2.8rem 3.2rem 4rem' flexDirection='column'>
      <Form form={form} layout='vertical' initialValues={initialValues} onFinish={handleSearch}>
        <SearchItemsContainer>
          <Form.Item name='title' label={t('title')}>
            <Input allowClear placeholder={t('title_placeholder')} />
          </Form.Item>
          <Form.Item name='regionCode' label={t('region')}>
            <Select
              allowClear
              showSearch
              optionFilterProp='label'
              options={regionOptions}
              loading={isRegionsLoading}
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
            <Button htmlType='submit' type='primaryOutlined' loading={isFetching}>
              {t('search')}
            </Button>
          </Box>
        </SearchItemsContainer>
      </Form>
    </Box>
  );
};

export default CustomFilter;
