import { Form, Switch } from 'antd';

import { useTr } from '@branch-services/translation';
import { Box, Button, Input } from '@branch-services/ui-kit';

import { ENGLISH_NAME_PATTERN } from '../../utils/constants';
import type { ServiceFormValues } from '../../utils/types';

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
        name='name'
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
      {isEdit && (
        <Form.Item name='active' label={t('status')} valuePropName='checked'>
          <Switch checkedChildren={t('active')} unCheckedChildren={t('inactive')} />
        </Form.Item>
      )}
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
