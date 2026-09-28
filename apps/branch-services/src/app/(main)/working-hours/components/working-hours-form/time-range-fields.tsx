import { Form } from 'antd';

import { useTr } from '@branch-services/translation';
import { Box, Select, Text } from '@branch-services/ui-kit';

import { getHourOptions } from '../../utils/utils';

const hourOptions = getHourOptions();

// The "from" / "to" hour pair, shared by the create form and the edit modal (used inside a Form)
const TimeRangeFields = () => {
  const [t] = useTr();

  return (
    <Box flexDirection='column' gap='0.8rem'>
      <Text as='span' fontWeight={500}>
        {t('working_hours_label')}
      </Text>
      <Box gap='1.6rem'>
        <Form.Item
          name='from'
          label={t('from_hour')}
          style={{ marginBottom: 0, flex: 1 }}
          rules={[{ required: true, message: t('hour_required') }]}
        >
          <Select options={hourOptions} placeholder={t('hour_select_placeholder')} allowClear />
        </Form.Item>
        <Form.Item
          name='to'
          label={t('to_hour')}
          style={{ marginBottom: 0, flex: 1 }}
          rules={[{ required: true, message: t('hour_required') }]}
        >
          <Select options={hourOptions} placeholder={t('hour_select_placeholder')} allowClear />
        </Form.Item>
      </Box>
    </Box>
  );
};

export default TimeRangeFields;
