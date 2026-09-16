import { useState } from 'react';
import { TablePaginationConfig } from 'antd';

import { useTr } from '@branch-services/translation';
import { Button, ColumnsType, Table } from '@branch-services/ui-kit';

import RemoveUnitModal from '../modals/remove-unit-modal';
import type { GroupUnit, UnitOption } from '../../utils/types';
import { calculateRow } from '../../utils/utils';

import { NewUnitTag, UnitsTableWrapper } from './style';

type GroupUnitsTableProps = {
  // value / onChange are injected by the wrapping Form.Item
  value?: UnitOption[];
  onChange?: (units: UnitOption[]) => void;
  newCodes: string[];
  onRemoved: (code: string) => void;
};

const GroupUnitsTable = ({ value = [], onChange, newCodes, onRemoved }: GroupUnitsTableProps) => {
  const [t] = useTr();
  const [pagination, setPagination] = useState({ page: 1, size: 10 });
  const [unitToRemove, setUnitToRemove] = useState<GroupUnit | null>(null);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);

  const units: GroupUnit[] = value.map(({ label, value: code }) => ({ name: label, code }));
  const isNew = (code: string) => newCodes.includes(code);

  const openRemoveModal = (unit: GroupUnit) => {
    setUnitToRemove(unit);
    setIsRemoveModalOpen(true);
  };

  const handleRemove = () => {
    if (!unitToRemove) return;

    const remaining = value.filter((unit) => unit.value !== unitToRemove.code);
    onChange?.(remaining);
    onRemoved(unitToRemove.code);
    setIsRemoveModalOpen(false);

    // Step back when the last row of the last page is removed
    const lastPage = Math.max(1, Math.ceil(remaining.length / pagination.size));
    if (pagination.page > lastPage) setPagination((current) => ({ ...current, page: lastPage }));
  };

  const handleTableChange = ({ current = 1, pageSize = pagination.size }: TablePaginationConfig) => {
    setPagination({ size: pageSize, page: pageSize === pagination.size ? current : 1 });
  };

  const columns: ColumnsType<GroupUnit> = [
    {
      title: '#',
      key: 'row',
      align: 'center',
      render: (_value, _record, index) => calculateRow({ index, pagination }),
    },
    {
      title: t('unit_name'),
      dataIndex: 'name',
      align: 'center',
      render: (name: string, { code }) => (
        <>
          {name}
          {isNew(code) && <NewUnitTag>{t('new')}</NewUnitTag>}
        </>
      ),
    },
    { title: t('unit_code'), dataIndex: 'code', align: 'center' },
    {
      title: t('actions'),
      key: 'actions',
      align: 'center',
      width: 120,
      render: (_value, unit) => (
        <Button htmlType='button' className='remove-unit' danger type='table' onClick={() => openRemoveModal(unit)}>
          {t('delete')}
          <i className='ri-delete-bin-line' />
        </Button>
      ),
    },
  ];

  return (
    <UnitsTableWrapper>
      <Table
        dataSource={units}
        columns={columns}
        mobileColumns={columns}
        rowKey='code'
        rowClassName={({ code }: GroupUnit) => (isNew(code) ? 'new-unit-row' : '')}
        total={units.length}
        current={pagination.page}
        pagination={{ current: pagination.page, pageSize: pagination.size, total: units.length }}
        onChange={handleTableChange}
        hasContainer={false}
      />
      <RemoveUnitModal
        open={isRemoveModalOpen}
        unitName={unitToRemove?.name}
        onCancel={() => setIsRemoveModalOpen(false)}
        onConfirm={handleRemove}
      />
    </UnitsTableWrapper>
  );
};

export default GroupUnitsTable;
