import { Form } from 'antd';

import { useTr } from '@branch-services/translation';
import { Box, Button, DatePicker, Input, SearchItemsContainer, Select } from '@branch-services/ui-kit';
import { Dayjs } from '@branch-services/utils';

import useRegionsQuery from '../../queries/use-regions-query';
import type { NewCustomHoliday } from '../../utils/types';
import { formatDateWithWeekday, toApiDate } from '../../utils/utils';

type EntryValues = { title: string; regionCode: string; date: Dayjs };

export type EnteredHoliday = NewCustomHoliday & { regionName: string };

type HolidayEntryFormProps = {
  isDuplicate: (holiday: NewCustomHoliday) => boolean;
  onAdd: (holiday: EnteredHoliday) => void;
};

// One holiday at a time; added rows are listed below the form
const HolidayEntryForm = ({ isDuplicate, onAdd }: HolidayEntryFormProps) => {
  const [t] = useTr();
  const [form] = Form.useForm<EntryValues>();
  const { data: regionOptions, isFetching } = useRegionsQuery();

  const handleAdd = ({ title, regionCode, date }: EntryValues) => {
    const holiday = { title: title.trim(), regionCode, date: toApiDate(date) as string };

    if (isDuplicate(holiday)) {
      form.setFields([{ name: 'date', errors: [t('duplicate_holiday')] }]);
      return;
    }

    const regionName = regionOptions?.find(({ value }) => value === regionCode)?.label ?? '';
    onAdd({ ...holiday, regionName });
    form.resetFields();
  };

  return (
    <Form form={form} layout='vertical' onFinish={handleAdd}>
      <SearchItemsContainer>
        <Form.Item
          className='half-width'
          name='title'
          label={t('title')}
          rules={[{ required: true, whitespace: true, message: t('title_required') }]}
        >
          <Input placeholder={t('title_example')} />
        </Form.Item>
        <Form.Item
          className='half-width'
          name='regionCode'
          label={t('region')}
          rules={[{ required: true, message: t('region_required') }]}
        >
          <Select
            showSearch
            optionFilterProp='label'
            options={regionOptions}
            loading={isFetching}
            placeholder={t('select_placeholder')}
          />
        </Form.Item>
        <Form.Item
          className='half-width'
          name='date'
          label={t('date')}
          rules={[{ required: true, message: t('date_required') }]}
        >
          <DatePicker
            placeholder={t('select_placeholder')}
            format={(value) => formatDateWithWeekday(toApiDate(value) as string)}
          />
        </Form.Item>
        <Box className='half-width buttons-container'>
          <Button htmlType='submit' type='primaryOutlined'>
            {t('add')}
          </Button>
        </Box>
      </SearchItemsContainer>
    </Form>
  );
};

export default HolidayEntryForm;
