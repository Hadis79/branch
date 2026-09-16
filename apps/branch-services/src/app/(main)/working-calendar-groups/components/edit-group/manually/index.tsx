import { Form } from 'antd';
import { useMemo } from 'react';

import { Box, Input, Select } from '@branch-services/ui-kit';
import { useTr } from '@branch-services/translation';

import SearchSVG from '../../../assets/media/search';
import { AddGroupFormValues } from '../../../utils/types';
import useGetUnitList from '../../../queries/use-get-unit-list';

import { SelectedOption, SelectedOptions } from '../style';

const AddGroupManually = () => {
  const [t] = useTr();
  const form = Form.useFormInstance<AddGroupFormValues>();
  const selectedUnits = Form.useWatch('units', form) ?? [];
  const { data: units = [], isFetching } = useGetUnitList();
  const unitOptions = useMemo(() => units.map(({ name, code }) => ({ label: name, value: code })), [units]);
  const removeUnit = (value: string) => {
    form.setFieldValue(
      'units',
      selectedUnits.filter((selectedUnit) => selectedUnit.value !== value)
    );
  };

  return (
    <Box>
      <Box flexDirection='column' width='100%'>
        <Form.Item
          name='name'
          label={t('group_name')}
          rules={[{ required: true, whitespace: true, message: t('group_name_required') }]}
        >
          <Input placeholder={t('group_name_placeholder')} />
        </Form.Item>
        <Form.Item name='units' label={t('unit')} rules={[{ required: true, message: t('unit_required') }]}>
          <Select
            options={unitOptions}
            mode='multiple'
            labelInValue
            placeholder={t('select_or_search')}
            optionFilterProp='label'
            showSearch
            loading={isFetching}
            maxTagCount={4}
            maxTagPlaceholder='...'
          />
        </Form.Item>
        <SelectedOptions>
          {selectedUnits.map(({ label, value }) => (
            <SelectedOption key={value}>
              <span>{label}</span>
              <button type='button' onClick={() => removeUnit(value)} aria-label={'unitName'}>
                <i className='ri ri-close-line' />
              </button>
            </SelectedOption>
          ))}
        </SelectedOptions>
      </Box>
      <SearchSVG />
    </Box>
  );
};

export default AddGroupManually;
