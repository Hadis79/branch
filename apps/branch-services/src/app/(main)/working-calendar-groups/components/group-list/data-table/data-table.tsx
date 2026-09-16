import { useCallback, useMemo, useState } from 'react';
import { TablePaginationConfig } from 'antd';
import { Table } from '@branch-services/ui-kit';
import { useTr } from '@branch-services/translation';

import EditModal from '../../modals/edit-modal';
import { columns, mobileColumns } from './columns';
import RemoveModal from '../../modals/remove-modal';
import useGroupStore from '../../../store/use-widget-store';
import useGroupMessage from '../../../hooks/use-group-message';
import { GroupListItem, GroupModalType } from '../../../utils/types';
import useGroupListQuery from '../../../queries/use-group-list-query';
import useDeleteGroupMutation from '../../../queries/use-remove-group-mutation';

import * as S from './data-table.style';

const DataTable = () => {
  const [t] = useTr();
  const [activeModal, setActiveModal] = useState<GroupModalType | null>(null);
  // Kept after closing so the modal title does not blank out during the close animation
  const [selectedGroup, setSelectedGroup] = useState<GroupListItem | null>(null);
  const pagination = useGroupStore((state) => state.pagination);
  const setPagination = useGroupStore((state) => state.setPagination);

  const { showSuccess, showError } = useGroupMessage();
  const { data, isFetching } = useGroupListQuery();
  const { mutate, isPending: isRemoving } = useDeleteGroupMutation();

  const handleTableChange = ({ current = 1, pageSize = pagination.size }: TablePaginationConfig) => {
    const pageSizeChanged = pageSize !== pagination.size;

    setPagination({
      size: pageSize,
      page: pageSizeChanged ? 1 : current,
    });
  };

  const openModalHandler = useCallback((record: GroupListItem, type: GroupModalType) => {
    setSelectedGroup(record);
    setActiveModal(type);
  }, []);

  const closeModalHandler = () => setActiveModal(null);

  const tableColumns = useMemo(() => columns({ t, pagination, openModalHandler }), [t, pagination, openModalHandler]);
  const tableMobileColumns = useMemo(() => mobileColumns({ t }), [t]);

  const onRemoveHandler = () => {
    if (!selectedGroup) return;

    mutate(
      { id: selectedGroup.id },
      {
        onSuccess: () => {
          showSuccess('delete_success');
          // Step back when the last row of a page is removed
          if (data?.content.length === 1 && pagination.page > 1) {
            setPagination({ page: pagination.page - 1 });
          }
          closeModalHandler();
        },
        onError: (error) => {
          showError(error);
          closeModalHandler();
        },
      }
    );
  };

  return (
    <S.DataTableBoxWrapper>
      <Table
        loading={isFetching}
        dataSource={data?.content}
        columns={tableColumns}
        onChange={handleTableChange}
        mobileColumns={tableMobileColumns}
        hasContainer={false}
        total={data?.totalElements}
        current={pagination?.page}
        pagination={{
          current: pagination.page,
          pageSize: pagination.size,
        }}
        rowKey='id'
      />
      <RemoveModal
        open={activeModal === 'remove'}
        onCancel={closeModalHandler}
        onConfirm={onRemoveHandler}
        confirmLoading={isRemoving}
        groupName={selectedGroup?.name}
      />
      <EditModal open={activeModal === 'edit'} onCancel={closeModalHandler} group={selectedGroup} />
    </S.DataTableBoxWrapper>
  );
};

export default DataTable;
