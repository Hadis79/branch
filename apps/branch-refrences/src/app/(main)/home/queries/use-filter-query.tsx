import { useQuery } from '@tanstack/react-query';
import { ApiUtil } from '@branch-services/utils';
import useWidgetStore from '../store/use-widget-store';

function handleError(reason: any): string {
  return ApiUtil.getErrorMessage(reason);
}

const getFilterAction = async (params: any): Promise<any> => {
  // Add your API implementation here
};

const useFilterQuery = () => {
  const { filter, pagination } = useWidgetStore();
  const { data, error, isLoading, isFetching, isError, refetch } = useQuery({
    queryKey: ['Filters', pagination.current, filter],
    queryFn: () => getFilterAction({ pagination, filter }),
  });

  const customizedError = isError && handleError(error);

  return { data, error: customizedError, isLoading, isFetching, isError, refetch };
};

export default useFilterQuery;
