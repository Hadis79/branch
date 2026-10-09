import { Form } from 'antd';
import type { FormRule } from 'antd';

import { useTr } from '@branch-services/translation';
import { Box, Input } from '@branch-services/ui-kit';

import ScopeTargetFields from './scope-target-fields';
import SlotsField from '../slots-field/slots-field';
import type { DutySlot } from '../../utils/types';

// Every field of the create form, top to bottom; the antd Form itself is owned by DutyForm
const DutyFields = () => {
  const [t] = useTr();

  const slotsRule: FormRule = {
    validator: (_, slots?: DutySlot[]) =>
      slots?.length ? Promise.resolve() : Promise.reject(new Error(t('slots_required'))),
  };

  return (
    <Box flexDirection='column' gap='2.4rem'>
      <ScopeTargetFields />
      <Form.Item
        name='title'
        label={t('title_label')}
        style={{ marginBottom: 0 }}
        rules={[{ required: true, whitespace: true, message: t('title_required') }]}
      >
        <Input placeholder={t('title_placeholder')} />
      </Form.Item>
      <Form.Item name='slots' style={{ marginBottom: 0 }} rules={[slotsRule]}>
        <SlotsField />
      </Form.Item>
    </Box>
  );
};

export default DutyFields;
