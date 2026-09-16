import { useMemo, useState } from 'react';
import { Form } from 'antd';

import { useTr } from '@branch-services/translation';
import { Button, EmptyData, Select } from '@branch-services/ui-kit';

import GroupNameField from './group-name-field';
import GroupUnitsTable, { GroupUnitRow } from './group-units-table';
import useGetUnitList from '../../queries/use-get-unit-list';
import useGroupUnitsPagesQuery from '../../queries/use-group-units-pages-query';
import type { GroupFormValues, GroupListItem, GroupUnit, PageParams } from '../../utils/types';
import { getServerPages, getUnitsPageLayout } from '../../utils/units-page';
import { toGroupUnit, toUnitOption } from '../../utils/utils';

import { ManualEditHeader, UnitOptionRow } from './style';

const matchesSearch = ({ name, code }: GroupUnit, search: string) => name.includes(search) || code.includes(search);

type ManualEditEntryProps = {
  group: GroupListItem;
};

// Edit form, manual mode: rename the group and add / remove units on top of its server-paginated list.
// Only the changes are kept in the form (`addedUnits`, `removedUnits`); the full list is built on save.
// The table pages one combined list: new units first, then the server units that were not removed.
const ManualEditEntry = ({ group }: ManualEditEntryProps) => {
  const [t] = useTr();
  const form = Form.useFormInstance<GroupFormValues>();
  const addedOptions = Form.useWatch('addedUnits', { form, preserve: true }) ?? [];
  const removedUnits = Form.useWatch('removedUnits', { form, preserve: true }) ?? [];
  const [search, setSearch] = useState('');
  const [pagination, setPagination] = useState<PageParams>({ page: 1, size: 10 });
  // The service total is known after the first response; the list row gives it until then
  const [serverTotal, setServerTotal] = useState(group.size);

  const { data: allUnits = [], isFetching: isUnitListLoading } = useGetUnitList();

  const addedUnits = useMemo(() => addedOptions.map(toGroupUnit), [addedOptions]);
  const removedIndexes = useMemo(() => removedUnits.map(({ index }) => index), [removedUnits]);
  const layout = getUnitsPageLayout({ ...pagination, addedCount: addedUnits.length, serverTotal, removedIndexes });

  const serverPages = getServerPages(layout.serverIndexes, pagination.size);
  const unitsPages = useGroupUnitsPagesQuery(group.id, serverPages, pagination.size);
  if (unitsPages.totalElements !== undefined && unitsPages.totalElements !== serverTotal) {
    setServerTotal(unitsPages.totalElements);
  }

  const serverRows = layout.serverIndexes.flatMap((serverIndex): GroupUnitRow[] => {
    const page = Math.floor(serverIndex / pagination.size) + 1;
    const unit = unitsPages.unitsByPage.get(page)?.[serverIndex % pagination.size];
    return unit ? [{ ...unit, serverIndex }] : [];
  });
  const rows: GroupUnitRow[] = [
    ...addedUnits.slice(layout.addedStart, layout.addedEnd).map((unit) => ({ ...unit, isNew: true })),
    ...serverRows,
  ];

  // Members outside the loaded pages are not known here; duplicates are dropped when the list is saved
  const visibleCodes = new Set([...addedUnits, ...serverRows].map(({ code }) => code));
  const options = allUnits.filter(({ code }) => !visibleCodes.has(code)).map(toUnitOption);

  const trimmedSearch = search.trim();
  const isAlreadyMember =
    !!trimmedSearch && [...addedUnits, ...serverRows].some((unit) => matchesSearch(unit, trimmedSearch));

  const setPage = (page: number) => setPagination((current) => ({ ...current, page }));

  const addUnit = (code: string) => {
    setSearch('');

    // Re-adding a removed member just restores it
    if (removedUnits.some((unit) => unit.code === code)) {
      form.setFieldValue(
        'removedUnits',
        removedUnits.filter((unit) => unit.code !== code)
      );
      return;
    }

    const unit = allUnits.find((item) => item.code === code);
    if (!unit || visibleCodes.has(code)) return;

    // New units go to the top of the list, so show the first page
    form.setFieldValue('addedUnits', [toUnitOption(unit), ...addedOptions]);
    setPage(1);
  };

  const removeUnit = ({ code, isNew, serverIndex }: GroupUnitRow) => {
    if (isNew) {
      form.setFieldValue(
        'addedUnits',
        addedOptions.filter(({ value }) => value !== code)
      );
    } else if (serverIndex !== undefined) {
      form.setFieldValue('removedUnits', [...removedUnits, { code, index: serverIndex }]);
    }

    // Step back when the last row of the last page is removed
    const lastPage = Math.max(1, Math.ceil((layout.total - 1) / pagination.size));
    if (pagination.page > lastPage) setPage(lastPage);
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
              <EmptyData description={t(isAlreadyMember ? 'unit_already_in_group' : 'unit_not_found')} />
            }
            placeholder={t('select_or_search')}
            loading={isUnitListLoading}
          />
        </Form.Item>
      </ManualEditHeader>
      <GroupUnitsTable
        rows={rows}
        total={layout.total}
        pagination={pagination}
        onPaginationChange={setPagination}
        loading={unitsPages.isFetching}
        canRemove={layout.total > 1}
        onRemove={removeUnit}
      />
    </>
  );
};

export default ManualEditEntry;
