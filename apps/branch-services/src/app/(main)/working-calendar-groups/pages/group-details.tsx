import { useState } from 'react';
import { TablePaginationConfig } from 'antd';
import { Box, Table } from '@branch-services/ui-kit';
import { useTr } from '@branch-services/translation';

import useGroupUnitsQuery from '../queries/use-group-units-query';
import useWorkingCalendarGroupPage from '../hooks/use-working-calendar-group-page';
import type { PageParams } from '../utils/types';
import { formatCount } from '../utils/utils';
import GroupDetailsEditAction from '../components/group-details/edit-action';
import { unitColumns } from '../components/group-details/columns';
import { DetailsPage, TableTitle } from '../components/group-details/style';
import useGroupStore from '../store/use-widget-store';

// Read-only list of one group's units, opened from the list's "show details" action
const GroupDetailsContent = ({ groupId, canEdit }: { groupId: string | null; canEdit: boolean }) => {
  const [t] = useTr();
  const selectedGroup = useGroupStore((state) => state.selectedGroup);
  const group = selectedGroup?.id === groupId ? selectedGroup : null;
  const [pagination, setPagination] = useState<PageParams>({ page: 1, size: 10 });
  const { data, isFetching } = useGroupUnitsQuery(groupId, pagination);

  const columns = unitColumns({ nameTitle: t('unit_name'), codeTitle: t('unit_code'), pagination });

  const handleChange = ({ current = 1, pageSize = pagination.size }: TablePaginationConfig) => {
    setPagination({ size: pageSize, page: pageSize === pagination.size ? current : 1 });
  };

  return (
    <DetailsPage>
      <Box justifyContent='space-between' alignItems='center' marginBottom='1.6rem'>
        <TableTitle>{t('unit_list_title', { unitCount: formatCount(data?.totalElements ?? 0) })}</TableTitle>
        {canEdit && <GroupDetailsEditAction group={group} total={data?.totalElements} />}
      </Box>
      <Table
        minHeight='0'
        loading={isFetching}
        dataSource={data?.content}
        columns={columns}
        mobileColumns={columns}
        rowKey='code'
        total={data?.totalElements}
        current={pagination.page}
        pagination={{ current: pagination.page, pageSize: pagination.size }}
        onChange={handleChange}
        hasContainer={false}
      />
    </DetailsPage>
  );
};

const GroupDetails = () => {
  const { groupId, isGroupDetailsFromList } = useWorkingCalendarGroupPage();
  return <GroupDetailsContent key={groupId} groupId={groupId} canEdit={isGroupDetailsFromList} />;
};

export default GroupDetails;
