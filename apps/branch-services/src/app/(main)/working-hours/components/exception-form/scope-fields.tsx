import { Form } from 'antd';

import { useTr } from '@branch-services/translation';
import { Box, Select, Text } from '@branch-services/ui-kit';

import { FieldSkeleton } from '../loading-skeletons/loading-skeletons';
import useGroupsQuery from '../../queries/use-groups-query';
import useProvincesQuery from '../../queries/use-provinces-query';
import useQueryErrorMessage from '../../hooks/use-query-error-message';
import useWorkingHoursStore from '../../store/use-widget-store';

// The scope an exception applies to: every province, a single one, or a working-hours group
const ScopeFields = () => {
  const [t] = useTr();
  const form = Form.useFormInstance();
  const scopeType = Form.useWatch('scopeType', form);
  const {
    data: provinceOptions,
    isFetching,
    error: provinceError,
  } = useProvincesQuery(scopeType === 'PROVINCIAL');
  const {
    data: groupOptions,
    isFetching: isFetchingGroups,
    error: groupError,
  } = useGroupsQuery(scopeType === 'GROUP');
  const setMessage = useWorkingHoursStore((state) => state.setMessage);
  useQueryErrorMessage(provinceError ?? groupError);

  const scopeTypeOptions = [
    { value: 'NATIONAL', label: t('scope_national') },
    { value: 'PROVINCIAL', label: t('scope_provincial') },
    { value: 'GROUP', label: t('scope_group') },
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
            onChange={() => {
              form.setFieldsValue({ provinceName: undefined, group: undefined });
              setMessage(null);
            }}
          />
        </Form.Item>
        {scopeType === 'PROVINCIAL' && (
          <Box flexDirection='column' gap='0.8rem'>
            <Form.Item
              name='provinceName'
              style={{ marginBottom: 0, flex: 1 }}
              rules={[{ required: true, message: t('province_required') }]}
            >
              <Select
                showSearch
                loading={isFetching}
                optionFilterProp='label'
                options={provinceOptions}
                placeholder={t('province_placeholder')}
              />
            </Form.Item>
          </Box>
        )}
        {scopeType === 'GROUP' && (
          // labelInValue keeps the group's name alongside its id, for the preview
          <Box flexDirection='column' gap='0.8rem'>
            <Form.Item
              name='group'
              style={{ marginBottom: 0, flex: 1 }}
              rules={[{ required: true, message: t('group_required') }]}
            >
              <Select
                labelInValue
                showSearch
                loading={isFetchingGroups}
                optionFilterProp='label'
                options={groupOptions}
                placeholder={t('group_placeholder')}
              />
            </Form.Item>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ScopeFields;
