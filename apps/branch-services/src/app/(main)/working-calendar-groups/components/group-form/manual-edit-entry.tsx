import { useMemo, useState } from 'react';
import { Empty, Form } from 'antd';

import { useTr } from '@branch-services/translation';
import { Button, Select } from '@branch-services/ui-kit';

import GroupNameField from './group-name-field';
import GroupUnitsTable from './group-units-table';
import useGetUnitList from '../../queries/use-get-unit-list';
import type { GroupFormValues, GroupUnit } from '../../utils/types';

import { ManualEditHeader, UnitOptionRow } from './style';

const matchesSearch = ({ name, code }: GroupUnit, search: string) => name.includes(search) || code.includes(search);

// Edit form, manual mode: rename the group and add / remove single units of its current list.
const ManualEditEntry = () => {
  const [t] = useTr();
  const form = Form.useFormInstance<GroupFormValues>();
  const units = Form.useWatch('units', { form, preserve: true }) ?? [];
  const { data: allUnits = [], isFetching } = useGetUnitList();
  const [search, setSearch] = useState('');
  // Units added in this session, shown on top with a "new" tag
  const [newCodes, setNewCodes] = useState<string[]>([]);

  const memberCodes = useMemo(() => new Set(units.map(({ value }) => value)), [units]);
  const availableUnits = useMemo(() => allUnits.filter(({ code }) => !memberCodes.has(code)), [allUnits, memberCodes]);
  const options = availableUnits.map(({ name, code }) => ({ label: name, value: code }));

  const trimmedSearch = search.trim();
  const isAlreadyMember =
    !!trimmedSearch && units.some(({ label, value }) => matchesSearch({ name: label, code: value }, trimmedSearch));

  const addUnit = (code: string) => {
    const unit = availableUnits.find((item) => item.code === code);
    if (!unit) return;

    form.setFieldValue('units', [{ label: unit.name, value: unit.code }, ...units]);
    form.validateFields(['units']).catch(() => undefined);
    setNewCodes((codes) => [...codes, unit.code]);
    setSearch('');
  };

  return (
    <>
      <ManualEditHeader>
        <GroupNameField inline />
        <Form.Item label={t('add_unit')} className='add-unit-field'>
          <Select
            showSearch
            value={null}
            searchValue={search}
            onSearch={setSearch}
            onSelect={(code) => addUnit(code as string)}
            options={options}
            filterOption={(input, option) =>
              matchesSearch({ name: String(option?.label ?? ''), code: String(option?.value ?? '') }, input.trim())
            }
            optionRender={({ label, value }) => (
              <UnitOptionRow>
                <span>{`${label} - ${value}`}</span>
                <Button
                  htmlType='button'
                  type='primaryOutlined'
                  size='small'
                  icon={<i className='ri-add-line' />}
                  onClick={(event) => {
                    // Keep the click from also selecting the option, which would add the unit twice
                    event.stopPropagation();
                    addUnit(String(value));
                  }}
                >
                  {t('add_unit')}
                </Button>
              </UnitOptionRow>
            )}
            notFoundContent={
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={t(isAlreadyMember ? 'unit_already_in_group' : 'unit_not_found')}
              />
            }
            placeholder={t('select_or_search')}
            loading={isFetching}
          />
        </Form.Item>
      </ManualEditHeader>
      <Form.Item name='units' rules={[{ required: true, message: t('unit_required') }]}>
        <GroupUnitsTable
          newCodes={newCodes}
          onRemoved={(code) => setNewCodes((codes) => codes.filter((item) => item !== code))}
        />
      </Form.Item>
    </>
  );
};

export default ManualEditEntry;
