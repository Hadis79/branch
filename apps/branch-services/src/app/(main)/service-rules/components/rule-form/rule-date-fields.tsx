import { Form } from 'antd';

import { useTr } from '@branch-services/translation';
import { dayjs, Dayjs } from '@branch-services/utils';
import { Box, DatePicker } from '@branch-services/ui-kit';

// The rule's start date and its optional end date, which can't come before the start; past days aren't pickable
const RuleDateFields = () => {
  const [t] = useTr();
  const form = Form.useFormInstance();
  // Watched so the end picker re-renders when the start changes; the validator reads the form directly,
  // since the watched value only catches up on the next render
  const startDate: Dayjs | undefined = Form.useWatch('startDate', form);

  const isBeforeDay = (date: Dayjs, other?: Dayjs | null) => Boolean(other && date.isBefore(other, 'day'));

  const disableEndDate = (current: Dayjs) => isBeforeDay(current, dayjs()) || isBeforeDay(current, startDate);

  const validateEndDate = (_: unknown, endDate?: Dayjs | null) =>
    endDate && isBeforeDay(endDate, form.getFieldValue('startDate'))
      ? Promise.reject(new Error(t('end_date_before_start')))
      : Promise.resolve();

  return (
    <Box gap='1.6rem'>
      <Form.Item
        name='startDate'
        label={t('start_date')}
        style={{ marginBottom: 0, flex: 1 }}
        rules={[{ required: true, message: t('start_date_required') }]}
      >
        <DatePicker style={{ width: '100%' }} placeholder={t('from_date_placeholder')} disabledPast />
      </Form.Item>
      <Form.Item
        name='endDate'
        label={t('end_date_optional')}
        style={{ marginBottom: 0, flex: 1 }}
        dependencies={['startDate']}
        rules={[{ validator: validateEndDate }]}
      >
        <DatePicker style={{ width: '100%' }} placeholder={t('from_date_placeholder')} disabledDate={disableEndDate} />
      </Form.Item>
    </Box>
  );
};

export default RuleDateFields;
