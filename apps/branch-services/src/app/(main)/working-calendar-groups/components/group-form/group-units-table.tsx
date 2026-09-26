import { useState } from 'react';
import { TablePaginationConfig } from 'antd';

import { useTr } from '@branch-services/translation';
import { Box, Button, ColumnsType, Table, Text } from '@branch-services/ui-kit';

import RemoveUnitModal from '../modals/remove-unit-modal';
import type { GroupUnit, PageParams } from '../../utils/types';
import { calculateRow } from '../../utils/utils';

import { NewUnitTag, UnitsTableWrapper } from './style';

export type GroupUnitRow = GroupUnit & {
  isNew?: boolean;
  // Position in the server list (server rows only)
  serverIndex?: number;
};

type GroupUnitsTableProps = {
  // Rows of the current page only, never more than the page size
  rows: GroupUnitRow[];
  total: number;
  pagination: PageParams;
  onPaginationChange: (pagination: PageParams) => void;
  loading: boolean;
  // False when removing would leave the group empty
  canRemove: boolean;
  onRemove: (row: GroupUnitRow) => void;
};

const GroupUnitsTable = ({
  rows,
  total,
  pagination,
  onPaginationChange,
  loading,
  canRemove,
  onRemove,
}: GroupUnitsTableProps) => {
  const [t] = useTr();
  const [rowToRemove, setRowToRemove] = useState<GroupUnitRow | null>(null);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);

  const openRemoveModal = (row: GroupUnitRow) => {
    setRowToRemove(row);
    setIsRemoveModalOpen(true);
  };

  const handleRemove = () => {
    if (rowToRemove) onRemove(rowToRemove);
    setIsRemoveModalOpen(false);
  };

  const handleTableChange = ({ current = 1, pageSize = pagination.size }: TablePaginationConfig) => {
    onPaginationChange({ size: pageSize, page: pageSize === pagination.size ? current : 1 });
  };

  const columns: ColumnsType<GroupUnitRow> = [
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
      render: (name: string, { isNew }) => (
        <Box width={'fit-content'} justifyContent='center' margin={'auto auto'} alignItems='center'>
          <span style={{ whiteSpace: 'nowrap' }}>{name}</span>
          {isNew && <NewUnitTag>{t('new')}</NewUnitTag>}
        </Box>
      ),
    },
    { title: t('unit_code'), dataIndex: 'code', align: 'center' },
    {
      title: t('actions'),
      key: 'actions',
      align: 'center',
      width: 120,
      render: (_value, row) => (
        <Button
          htmlType='button'
          className='remove-unit'
          danger
          type='table'
          disabled={!canRemove}
          onClick={() => openRemoveModal(row)}
        >
          {t('delete')}
          <i className='ri-delete-bin-line' />
        </Button>
      ),
    },
  ];

  return (
    <UnitsTableWrapper>
      <Table
        loading={loading}
        dataSource={rows}
        columns={columns}
        mobileColumns={columns}
        rowClassName={({ isNew }: GroupUnitRow) => (isNew ? 'new-unit-row' : '')}
        onChange={handleTableChange}
        hasContainer={false}
        total={total}
        current={pagination.page}
        pagination={{
          current: pagination.page,
          pageSize: pagination.size,
        }}
        rowKey='code'
      />
      <RemoveUnitModal
        open={isRemoveModalOpen}
        unitName={rowToRemove?.name}
        onCancel={() => setIsRemoveModalOpen(false)}
        onConfirm={handleRemove}
      />
    </UnitsTableWrapper>
  );
};

export default GroupUnitsTable;
