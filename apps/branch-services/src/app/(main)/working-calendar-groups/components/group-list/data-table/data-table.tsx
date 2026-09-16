import { useState } from 'react';
import { TablePaginationConfig } from 'antd';
import { Table } from '@branch-services/ui-kit';
import { useTr } from '@branch-services/translation';

import EditModal from '../../modals/edit-modal';
import { columns, mobileColumns } from './columns';
import RemoveModal from '../../modals/remove-modal';
import useGroupStore from '../../../store/use-widget-store';
import { GroupListItem, ModalType } from '../../../utils/types';
import useGroupListQuery from '../../../queries/use-group-list-query';
import useDeleteGroupMutation from '../../../queries/use-remove-group-mutation';

import * as S from './data-table.style';

const DataTable = () => {
  const [t] = useTr();
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const pagination = useGroupStore((state) => state.pagination);
  const setPagination = useGroupStore((state) => state.setPagination);
  const selectedGroupId = useGroupStore((state) => state.selectedGroupId);
  const setSelectedGroupId = useGroupStore((state) => state.setSelectedGroupId);

  const setMessage = useGroupStore((state) => state.setMessage);
  const { data, isFetching } = useGroupListQuery();
  const { mutate } = useDeleteGroupMutation();

  const handleTableChange = ({ current = 1, pageSize = pagination.size }: TablePaginationConfig) => {
    const pageSizeChanged = pageSize !== pagination.size;

    setPagination({
      ...pagination,
      size: pageSize,
      page: pageSizeChanged ? 1 : current,
    });
  };

  const openModalHandler = (record: GroupListItem, type: ModalType) => {
    setSelectedGroupId(record.id);
    setActiveModal(type);
  };

  const closeModalHandler = () => {
    setActiveModal(null);
    setSelectedGroupId(null);
  };
  const onRemoveHandler = () => {
    mutate(
      {
        id: selectedGroupId!,
      },
      {
        onSuccess: () => {
          setMessage({ txt: 'delete_success', type: 'success', shouldTranslate: true });
          setActiveModal(null);
        },
      }
    );
  };

  return (
    <S.DataTableBoxWrapper>
      <Table
        loading={isFetching}
        dataSource={data?.content}
        columns={columns({ t, pagination, openModalHandler })}
        onChange={handleTableChange}
        mobileColumns={mobileColumns({ t })}
        hasContainer={false}
        total={data?.totalElements}
        current={pagination?.page}
        pagination={{
          current: pagination.page,
          pageSize: pagination.size,
        }}
        rowKey='id'
      />
      <RemoveModal open={activeModal === 'remove'} onCancel={closeModalHandler} onConfirm={onRemoveHandler} />
      <EditModal open={activeModal === 'edit'} onCancel={closeModalHandler} onConfirm={onRemoveHandler} />
    </S.DataTableBoxWrapper>
  );
};

export default DataTable;
