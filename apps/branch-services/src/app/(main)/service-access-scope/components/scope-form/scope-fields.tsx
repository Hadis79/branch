import { Form } from 'antd';

import { useTr } from '@branch-services/translation';
import { Box, Input, MessageBox } from '@branch-services/ui-kit';

import ScopeDateFields from './scope-date-fields';
import ScopeDaysFields from './scope-days-fields';
import ScopeNotes from './scope-notes';
import ScopeTargetFields from './scope-target-fields';
import OptionsSelect from '../options-select/options-select';
import useQueryErrorMessage from '../../hooks/use-query-error-message';
import useServiceOptionsQuery from '../../queries/use-service-options-query';
import type { DayOfWeek } from '../../utils/types';

type ScopeFieldsProps = {
  weekDays: DayOfWeek[];
};

// Every field of the create form, top to bottom; the antd Form itself is owned by ScopeForm
const ScopeFields = ({ weekDays }: ScopeFieldsProps) => {
  const [t] = useTr();
  const { data: serviceOptions, isLoading, error } = useServiceOptionsQuery();
  useQueryErrorMessage(error);

  return (
    <Box flexDirection='column' gap='2.4rem'>
      <Form.Item
        name='service'
        label={t('service_field_label')}
        style={{ marginBottom: 0 }}
        rules={[{ required: true, message: t('service_required') }]}
      >
        <OptionsSelect isLoading={isLoading} options={serviceOptions} placeholder={t('select_placeholder')} />
      </Form.Item>
      <ScopeTargetFields />
      <Form.Item
        name='title'
        label={t('title_label')}
        style={{ marginBottom: 0 }}
        rules={[{ required: true, whitespace: true, message: t('title_required') }]}
      >
        <Input placeholder={t('title_placeholder')} />
      </Form.Item>
      <MessageBox type='warning' message={<ScopeNotes />} />
      <ScopeDateFields />
      <ScopeDaysFields weekDays={weekDays} />
    </Box>
  );
};

export default ScopeFields;
