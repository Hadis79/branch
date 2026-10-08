import { useState } from 'react';
import { Form } from 'antd';

import { useTr } from '@branch-services/translation';
import { Box, Button, DatePicker, FilterButton, Input, SearchItemsContainer, Select } from '@branch-services/ui-kit';

import OfficialStatusSelect from '../../official-status-select/official-status-select';
import useHolidaysQuery from '../../../queries/use-holidays-query';
import useProvincesQuery from '../../../queries/use-provinces-query';
import useHolidayStore from '../../../store/use-widget-store';
import ParamUtil, { HolidayFilterValues } from '../../../utils/param-util';
import { isSameFilter } from '../../../utils/utils';

import { FilterActions } from './holiday-filter.style';

// Fields behind the "filter" button, with their cleared values
const EXTRA_FIELDS = ['provinceName', 'officialStatus'] as const;
const CLEARED_EXTRA_VALUES: HolidayFilterValues = { provinceName: undefined, officialStatus: '' };

const HolidayFilter = () => {
  const [t] = useTr();
  const [form] = Form.useForm<HolidayFilterValues>();
  const fromDate = Form.useWatch('fromDate', form);
  const [isExtraOpen, setIsExtraOpen] = useState(false);
  const filter = useHolidayStore((state) => state.filter);
  const setFilter = useHolidayStore((state) => state.setFilter);
  const { isFetching, refetch } = useHolidaysQuery();
  const { data: provinceOptions, isFetching: isProvincesLoading } = useProvincesQuery();
  const hasExtraFilter = EXTRA_FIELDS.some((name) => filter[name]);

  const handleSearch = (values: HolidayFilterValues) => {
    const next = ParamUtil.holidayList(values);

    // The same search keeps the query key, so the list has to be refetched explicitly
    if (isSameFilter(next, filter)) refetch();
    else setFilter(next);
  };

  // Clears the extra fields and applies the search right away
  const handleRemoveFilters = () => {
    form.setFieldsValue(CLEARED_EXTRA_VALUES);
    form.submit();
  };

  return (
    <Box padding='2.8rem 3.2rem 4rem' flexDirection='column'>
      <Form form={form} layout='vertical' initialValues={ParamUtil.holidayFilterForm(filter)} onFinish={handleSearch}>
        <SearchItemsContainer>
          <Form.Item name='title' label={t('title')} className='half-width'>
            <Input allowClear placeholder={t('title_placeholder')} />
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
          <Box
            className='full-width buttons-container'
            justifyContent='flex-end'
            alignItems='center'
            gap='0.8rem'
            fillChildren={false}
          >
            <FilterActions>
              {isExtraOpen && (
                <Button type='link' onClick={handleRemoveFilters}>
                  {t('remove_filters')}
                </Button>
              )}
              <FilterButton
                width='10rem'
                active={isExtraOpen}
                showBadge={hasExtraFilter}
                onClick={() => setIsExtraOpen(!isExtraOpen)}
              />
            </FilterActions>
            <Button htmlType='submit' type='primaryOutlined' loading={isFetching}>
              {t('search')}
            </Button>
          </Box>
          {isExtraOpen && (
            <>
              <Form.Item name='provinceName' label={t('region')} className='half-width'>
                <Select
                  allowClear
                  showSearch
                  optionFilterProp='label'
                  options={provinceOptions}
                  loading={isProvincesLoading}
                  placeholder={t('select_placeholder')}
                />
              </Form.Item>
              <Form.Item name='officialStatus' label={t('type')} className='half-width'>
                <OfficialStatusSelect includeAll />
              </Form.Item>
            </>
          )}
        </SearchItemsContainer>
      </Form>
    </Box>
  );
};

export default HolidayFilter;
