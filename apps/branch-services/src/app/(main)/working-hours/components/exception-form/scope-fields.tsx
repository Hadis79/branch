import { Form } from 'antd';

import { useTr } from '@branch-services/translation';
import { Box, Select, Text } from '@branch-services/ui-kit';

import useProvincesQuery from '../../queries/use-provinces-query';

// The scope an exception applies to: every province, or a single one
const ScopeFields = () => {
  const [t] = useTr();
  const form = Form.useFormInstance();
  const scopeType = Form.useWatch('scopeType', form);
  const { data: provinceOptions, isFetching } = useProvincesQuery();

  const scopeTypeOptions = [
    { value: 'NATIONAL', label: t('scope_national') },
    { value: 'PROVINCIAL', label: t('scope_provincial') },
  ];

  return (
    <Box flexDirection='column' gap='0.8rem'>
      <Text as='span' fontWeight={500}>
        {t('scope_label')}
      </Text>
      <Box flexDirection='column' gap='1.6rem'>
        <Form.Item
          name='scopeType'
          style={{ marginBottom: 0, flex: 1 }}
          rules={[{ required: true, message: t('scope_required') }]}
        >
          <Select
            options={scopeTypeOptions}
            placeholder={t('select_placeholder')}
            onChange={() => form.setFieldValue('provinceName', undefined)}
          />
        </Form.Item>
        {scopeType === 'PROVINCIAL' && (
          <Form.Item
            name='provinceName'
            style={{ marginBottom: 0, flex: 1 }}
            rules={[{ required: true, message: t('province_required') }]}
          >
            <Select
              showSearch
              optionFilterProp='label'
              options={provinceOptions}
              loading={isFetching}
              placeholder={t('province_placeholder')}
            />
          </Form.Item>
        )}
      </Box>
    </Box>
  );
};

export default ScopeFields;
