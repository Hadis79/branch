import useServicesQuery from '../queries/use-services-query';
import useServiceStore from '../store/use-widget-store';

const useEmptyServiceList = (enabled = true) => {
  const hasFilter = useServiceStore((state) => Boolean(state.filter.name?.trim()));
  const { data, isSuccess, isFetching } = useServicesQuery();

  return enabled && !hasFilter && isSuccess && !isFetching && data?.totalElements === 0;
};

export default useEmptyServiceList;
