import { Box } from '@branch-services/ui-kit';

import Filter from '../components/group-list/filter/filter';
import useEmptyGroupList from '../hooks/use-empty-group-list';
import DataTable from '../components/group-list/data-table/data-table';
import GroupEmptyState from '../components/group-list/empty-state/group-empty-state';

const GroupList = () => {
  const isEmptyList = useEmptyGroupList();

  if (isEmptyList) return <GroupEmptyState />;

  return (
    <Box width='100%' justifyContent='center' alignItems='center' flexDirection='column'>
      <Filter />
      <DataTable />
    </Box>
  );
};

export default GroupList;
