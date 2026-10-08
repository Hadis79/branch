import { useCallback, useMemo, useState } from 'react';

import { useTr } from '@branch-services/translation';
import { EmptyData, Table } from '@branch-services/ui-kit';

import { getHolidayColumns } from './columns';
import DeleteHolidayModal from '../../delete-holiday-modal/delete-holiday-modal';
import EditHolidayModal from '../../edit-holiday-modal/edit-holiday-modal';
import useHolidayMessage from '../../../hooks/use-holiday-message';
import useDeleteHolidayMutation from '../../../queries/use-delete-holiday-mutation';
import useHolidaysQuery from '../../../queries/use-holidays-query';
import useHolidayStore from '../../../store/use-widget-store';
import type { Holiday, HolidayModalType } from '../../../utils/types';
import { nextPagination } from '../../../utils/utils';

// The whole list is loaded at once, so the table pages through it itself
const HolidayTable = () => {
  const [t] = useTr();
  const [activeModal, setActiveModal] = useState<HolidayModalType | null>(null);
  // Kept after closing so the modal title does not blank out during the close animation
  const [selectedHoliday, setSelectedHoliday] = useState<Holiday | null>(null);
  const pagination = useHolidayStore((state) => state.pagination);
  const setPagination = useHolidayStore((state) => state.setPagination);
  const { showSuccess, showError, resetMessage } = useHolidayMessage();
  const { data, isFetching } = useHolidaysQuery();
  const { mutate, isPending: isDeleting } = useDeleteHolidayMutation();

  const openModalHandler = useCallback(
    (holiday: Holiday, type: HolidayModalType) => {
      resetMessage();
      setSelectedHoliday(holiday);
      setActiveModal(type);
    },
    [resetMessage]
  );

  const closeModalHandler = () => setActiveModal(null);

  const columns = useMemo(
    () => getHolidayColumns({ t, pagination, openModalHandler }),
    [t, pagination, openModalHandler]
  );

  const onDeleteHandler = () => {
    if (!selectedHoliday) return;

    mutate(
      { provinceName: selectedHoliday.provinceName, date: selectedHoliday.date },
      {
        onSuccess: () => {
          showSuccess('delete_success', { title: selectedHoliday.title });
          // Step back when the last row of a page is deleted
          const rowsOnPage = (data?.length ?? 0) - (pagination.page - 1) * pagination.size;
          if (rowsOnPage === 1 && pagination.page > 1) setPagination({ page: pagination.page - 1 });
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
    <>
      <Table
        loading={isFetching}
        dataSource={data}
        columns={columns}
        mobileColumns={columns}
        onChange={(config) => setPagination(nextPagination(config, pagination.size))}
        hasContainer={false}
        total={data?.length}
        current={pagination.page}
        pagination={{ current: pagination.page, pageSize: pagination.size }}
        locale={{ emptyText: <EmptyData description={t('no_matching_holidays')} /> }}
        rowKey='id'
      />
      <DeleteHolidayModal
        open={activeModal === 'delete'}
        onCancel={closeModalHandler}
        onConfirm={onDeleteHandler}
        confirmLoading={isDeleting}
        holidayTitle={selectedHoliday?.title}
      />
      <EditHolidayModal open={activeModal === 'edit'} onCancel={closeModalHandler} holiday={selectedHoliday} />
    </>
  );
};

export default HolidayTable;
