import { Form } from 'antd';
import { useMemo } from 'react';

import { Button, Select } from '@branch-services/ui-kit';
import { useTr } from '@branch-services/translation';

import EntryLayout from './entry-layout';
import { GroupFormValues } from '../../utils/types';
import useGetUnitList from '../../queries/use-get-unit-list';

import { SelectedOption, SelectedOptions } from './style';

const ManualEntry = () => {
  const [t] = useTr();
  const form = Form.useFormInstance<GroupFormValues>();
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
    <EntryLayout>
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
            <Button type='link' onClick={() => removeUnit(value)} aria-label={t('remove_unit', { unitName: label })}>
              <i className='ri ri-close-line' />
            </Button>
            <span>{label}</span>
          </SelectedOption>
        ))}
      </SelectedOptions>
    </EntryLayout>
  );
};

export default ManualEntry;
