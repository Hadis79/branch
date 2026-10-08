import { Form, FormInstance } from 'antd';

import { useTr } from '@branch-services/translation';
import { DatePicker, Input, Select } from '@branch-services/ui-kit';
import { dayjs } from '@branch-services/utils';

import OfficialStatusSelect from '../official-status-select/official-status-select';
import type { OfficialStatus } from '../../utils/constants';
import type { Holiday } from '../../utils/types';
import { formatDateWithWeekday, toApiDate } from '../../utils/utils';

export type EditHolidayValues = { title: string; officialStatus: OfficialStatus };

type EditHolidayFormProps = {
  form: FormInstance<EditHolidayValues>;
  holiday: Holiday;
  onFinish: (values: EditHolidayValues) => void;
};

// The region and the date can't be changed: a holiday is identified by them (e.g. when it's deleted)
const EditHolidayForm = ({ form, holiday, onFinish }: EditHolidayFormProps) => {
  const [t] = useTr();

  return (
    <Form form={form} layout='vertical' onFinish={onFinish}>
      <Form.Item
        name='title'
        label={t('title')}
        rules={[{ required: true, whitespace: true, message: t('title_required') }]}
      >
        <Input placeholder={t('title_example')} />
      </Form.Item>
      <Form.Item name='officialStatus' label={t('type')} rules={[{ required: true, message: t('type_required') }]}>
        <OfficialStatusSelect placeholder={t('select_placeholder')} />
      </Form.Item>
      <Form.Item label={t('region')}>
        <Select
          disabled
          value={holiday.provinceName}
          options={[{ value: holiday.provinceName, label: holiday.provinceName }]}
        />
      </Form.Item>
      <Form.Item label={t('date')}>
        <DatePicker
          disabled
          value={dayjs(holiday.date)}
          style={{ width: '100%' }}
          format={(value) => formatDateWithWeekday(toApiDate(value) as string)}
        />
      </Form.Item>
    </Form>
  );
};

export default EditHolidayForm;
