import useGroupListQuery from '../queries/use-group-list-query';
import useGroupStore from '../store/use-widget-store';

const useEmptyGroupList = (enabled = true) => {
  const hasFilter = useGroupStore((state) => Boolean(state.filter.name?.trim()));
  const { data, isSuccess, isFetching } = useGroupListQuery(enabled);

  return enabled && !hasFilter && isSuccess && !isFetching && data?.totalElements === 0;
};

export default useEmptyGroupList;
