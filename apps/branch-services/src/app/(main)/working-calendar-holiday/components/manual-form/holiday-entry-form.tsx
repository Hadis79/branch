import { Form } from 'antd';

import { useTr } from '@branch-services/translation';
import { Box, Button, DatePicker, Input, SearchItemsContainer, Select } from '@branch-services/ui-kit';
import { Dayjs } from '@branch-services/utils';

import OfficialStatusSelect from '../official-status-select/official-status-select';
import useProvincesQuery from '../../queries/use-provinces-query';
import type { OfficialStatus } from '../../utils/constants';
import type { NewHoliday } from '../../utils/types';
import { formatDateWithWeekday, toApiDate, weekdayName } from '../../utils/utils';

type EntryValues = { title: string; officialStatus: OfficialStatus; provinceName: string; date: Dayjs };

type HolidayEntryFormProps = {
  isDuplicate: (holiday: NewHoliday) => boolean;
  onAdd: (holiday: NewHoliday) => void;
};

// One holiday at a time; added rows are listed below the form
const HolidayEntryForm = ({ isDuplicate, onAdd }: HolidayEntryFormProps) => {
  const [t] = useTr();
  const [form] = Form.useForm<EntryValues>();
  const { data: provinceOptions, isFetching } = useProvincesQuery();

  const handleAdd = ({ title, officialStatus, provinceName, date }: EntryValues) => {
    const province = provinceOptions?.find((option) => option.value === provinceName)?.province;
    if (!province) return;

    const apiDate = toApiDate(date) as string;
    const holiday: NewHoliday = {
      title: title.trim(),
      date: apiDate,
      holidayDay: weekdayName(apiDate),
      officialStatus,
      provinceName: province.provinceName,
    };

    if (isDuplicate(holiday)) {
      form.setFields([{ name: 'date', errors: [t('duplicate_holiday')] }]);
      return;
    }

    onAdd(holiday);
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
          name='officialStatus'
          label={t('type')}
          rules={[{ required: true, message: t('type_required') }]}
        >
          <OfficialStatusSelect placeholder={t('select_placeholder')} />
        </Form.Item>
        <Form.Item
          className='half-width'
          name='provinceName'
          label={t('region')}
          rules={[{ required: true, message: t('region_required') }]}
        >
          <Select
            showSearch
            optionFilterProp='label'
            options={provinceOptions}
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
        <Box className='full-width buttons-container'>
          <Button htmlType='submit' type='primaryOutlined'>
            {t('add')}
          </Button>
        </Box>
      </SearchItemsContainer>
    </Form>
  );
};

export default HolidayEntryForm;
