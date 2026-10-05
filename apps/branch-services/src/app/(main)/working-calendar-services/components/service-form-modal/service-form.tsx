import { Form, Switch } from 'antd';

import { useTr } from '@branch-services/translation';
import { Box, Button, Input } from '@branch-services/ui-kit';

import { RoundedBox } from './service-form-modal.style';
import { ENGLISH_NAME_PATTERN } from '../../utils/constants';
import type { ServiceFormValues } from '../../utils/types';

type LabeledSwitchProps = {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
};

// Switch with its current state written next to it; Form.Item passes `checked` / `onChange`
const LabeledSwitch = ({ checked = false, onChange }: LabeledSwitchProps) => {
  const [t] = useTr();

  return (
    <Box alignItems='center' gap='0.8rem'>
      <span className='switch-state'>{t(checked ? 'active' : 'inactive')}</span>
      <Switch checked={checked} onChange={onChange} />
    </Box>
  );
};

type SwitchBoxProps = {
  name: 'active' | 'overridable';
  label: string;
  description?: string;
};

const SwitchBox = ({ name, label, description }: SwitchBoxProps) => (
  <Box className='rounded-box-container'>
    <Box className='rounded-box-container__layout__inline'>
      <Form.Item label={label} name={name} valuePropName='checked'>
        <LabeledSwitch />
      </Form.Item>
    </Box>
    {description && <p className='rounded-box-container__description'>{description}</p>}
  </Box>
);

type ServiceFormProps = {
  isEdit: boolean;
  initialValues: Partial<ServiceFormValues>;
  isPending: boolean;
  onSubmit: (values: ServiceFormValues) => void;
  onCancel: () => void;
};

const ServiceForm = ({ isEdit, initialValues, isPending, onSubmit, onCancel }: ServiceFormProps) => {
  const [t] = useTr();

  return (
    <Form<ServiceFormValues> layout='vertical' initialValues={initialValues} disabled={isPending} onFinish={onSubmit}>
      <Form.Item
        name='persianName'
        label={t('service_name')}
        rules={[{ required: true, whitespace: true, message: t('service_name_required') }]}
      >
        <Input placeholder={t('service_name_placeholder')} />
      </Form.Item>
      <Form.Item
        name='englishName'
        label={t('service_english_name')}
        rules={[
          { required: true, whitespace: true, message: t('service_english_name_required') },
          { pattern: ENGLISH_NAME_PATTERN, message: t('service_english_name_invalid') },
        ]}
      >
        <Input dir='ltr' placeholder={t('service_english_name_placeholder')} />
      </Form.Item>
      <RoundedBox>
        {/* A new service always starts active, so its status is only editable afterwards */}
        {isEdit && <SwitchBox name='active' label={t('status')} />}
        <SwitchBox name='overridable' label={t('overridable_status')} description={t('overridable_description')} />
      </RoundedBox>
      <Box gap='1.6rem' marginTop='2.4rem'>
        <Button htmlType='button' type='primaryOutlined' onClick={onCancel}>
          {t('cancel')}
        </Button>
        <Button htmlType='submit' type='primary' loading={isPending}>
          {t(isEdit ? 'save_changes' : 'create_service')}
        </Button>
      </Box>
    </Form>
  );
};

export default ServiceForm;
