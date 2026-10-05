import { Form } from 'antd';

import { useTr } from '@branch-services/translation';
import { Select } from '@branch-services/ui-kit';

import { GROUP_TYPE_OPTIONS } from '../../utils/constants';

type GroupTypeFieldProps = {
  // Edit form: the type is set once at creation, so it's only shown, with a hint on why
  locked?: boolean;
  className?: string;
};

const GroupTypeField = ({ locked = false, className }: GroupTypeFieldProps) => {
  const [t] = useTr();

  return (
    <Form.Item
      name='groupType'
      label={t('group_type')}
      rules={locked ? undefined : [{ required: true, message: t('group_type_required') }]}
      extra={locked ? t('group_type_locked_hint') : undefined}
      className={className}
    >
      <Select
        options={GROUP_TYPE_OPTIONS.map(({ value, label }) => ({ value, label: t(label) }))}
        placeholder={t('group_type_placeholder')}
        disabled={locked}
      />
    </Form.Item>
  );
};

export default GroupTypeField;
