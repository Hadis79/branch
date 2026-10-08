import { Form } from 'antd';

import { useTr } from '@branch-services/translation';
import { Box, Input, MessageBox, Select } from '@branch-services/ui-kit';

import RuleDateFields from './rule-date-fields';
import RuleDaysFields from './rule-days-fields';
import RuleNotes from './rule-notes';
import useServiceOptionsQuery from '../../queries/use-service-options-query';
import type { DayOfWeek } from '../../utils/types';

type RuleFieldsProps = {
  weekDays: DayOfWeek[];
};

// Every field of the create form, top to bottom; the antd Form itself is owned by RuleForm
const RuleFields = ({ weekDays }: RuleFieldsProps) => {
  const [t] = useTr();
  const { data: serviceOptions, isFetching } = useServiceOptionsQuery();

  return (
    <Box flexDirection='column' gap='2.4rem'>
      <Form.Item
        name='service'
        label={t('service_field_label')}
        style={{ marginBottom: 0 }}
        rules={[{ required: true, message: t('service_required') }]}
      >
        <Select
          labelInValue
          showSearch
          optionFilterProp='label'
          options={serviceOptions}
          loading={isFetching}
          placeholder={t('select_placeholder')}
        />
      </Form.Item>
      <Form.Item
        name='title'
        label={t('title_label')}
        style={{ marginBottom: 0 }}
        rules={[{ required: true, whitespace: true, message: t('title_required') }]}
      >
        <Input placeholder={t('title_placeholder')} />
      </Form.Item>
      <MessageBox type='warning' message={<RuleNotes />} />
      <RuleDateFields />
      <RuleDaysFields weekDays={weekDays} />
    </Box>
  );
};

export default RuleFields;
