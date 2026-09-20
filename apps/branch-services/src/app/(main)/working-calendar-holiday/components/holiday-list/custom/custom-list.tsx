import { useState } from 'react';

import { useTr } from '@branch-services/translation';
import { Table } from '@branch-services/ui-kit';
import { ApiUtil } from '@branch-services/utils';

import CustomFilter from './custom-filter';
import DeleteHolidayModal from './delete-holiday-modal';
import { getCustomColumns } from './custom-columns';
import HolidayMessage from '../../holiday-message/holiday-message';
import useCustomHolidaysQuery from '../../../queries/use-custom-holidays-query';
import useHolidayStore from '../../../store/use-widget-store';
import type { CustomHoliday } from '../../../utils/types';
import { nextPagination } from '../../../utils/utils';

const CustomList = () => {
  const [t] = useTr();
  const [holidayToDelete, setHolidayToDelete] = useState<CustomHoliday | null>(null);
  const pagination = useHolidayStore((state) => state.customPagination);
  const setPagination = useHolidayStore((state) => state.setCustomPagination);
  const { data, error, isFetching } = useCustomHolidaysQuery();

  const columns = getCustomColumns({ t, pagination, onDelete: setHolidayToDelete });

  return (
    <>
      {error && <HolidayMessage message={ApiUtil.getErrorMessage(error)} margin='2.4rem 3.2rem 0' />}
      <CustomFilter />
      <Table
        loading={isFetching}
        dataSource={data?.content}
        columns={columns}
        mobileColumns={columns}
        onChange={(config) => setPagination(nextPagination(config, pagination.size))}
        hasContainer={false}
        total={data?.totalElements}
        current={pagination.page}
        pagination={{ current: pagination.page, pageSize: pagination.size }}
        rowKey='id'
      />
      <DeleteHolidayModal
        holiday={holidayToDelete}
        isLastRow={data?.numberOfElements === 1}
        onClose={() => setHolidayToDelete(null)}
      />
    </>
  );
};

export default CustomList;
