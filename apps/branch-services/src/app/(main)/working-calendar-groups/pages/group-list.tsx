import { Box } from '@branch-services/ui-kit';

import Filter from '../components/group-list/filter/filter';
import DataTable from '../components/group-list/data-table/data-table';
import GroupEmptyState from '../components/group-list/empty-state/group-empty-state';
import { useGroupListQueryContext } from '../queries/group-list-query-context';
import useGroupStore from '../store/use-widget-store';

const GroupList = () => {
  const filter = useGroupStore((state) => state.filter);
  const query = useGroupListQueryContext();
  const hasFilter = Boolean(filter.name?.trim() || filter.groupType);
  const isEmptyList = !hasFilter && query.isSuccess && !query.isFetching && query.data.totalElements === 0;

  if (isEmptyList) return <GroupEmptyState />;

  return (
    <Box width='100%' justifyContent='center' alignItems='center' flexDirection='column'>
      <Filter isFetching={query.isFetching} onRefetch={() => void query.refetch()} />
      <DataTable data={query.data} isFetching={query.isFetching} />
    </Box>
  );
};

export default GroupList;
