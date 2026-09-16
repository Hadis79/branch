import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { ApiUtil } from '@branch-services/utils';
import { getBatchAchHistoryQueryKey } from '../utils/consts';
import { Api } from '../services';
import ParamUtil from '../utils/param-util';
import useBatchAchHistoryStore from '../store/use-widget-store';
import { useEffect } from 'react';
import { HistoryPaginationParams, HistoryParams } from '../services/api-type';

function handleError(reason: any): string {
  return ApiUtil.getErrorMessage(reason);
}

const getFilterAction = async (params: HistoryParams, pagination: HistoryPaginationParams): Promise<any> => {
  return await Api.getHistory(ParamUtil.prepareParams({ params: { requestDto: params } }), pagination);
};

const useFilterQuery = () => {
  const { filter, pagination, setMessage, resetMessage } = useBatchAchHistoryStore();
  const { data, error, isLoading, isFetching, isError, refetch, isPlaceholderData } = useQuery({
    queryKey: getBatchAchHistoryQueryKey(filter, pagination),
    queryFn: () => getFilterAction(filter, pagination),
    staleTime: 0,
    refetchOnMount: 'always',
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (error) {
      const customizedError = isError && handleError(error);
      setMessage(customizedError as any);
    } else resetMessage();
  }, [error]);

  return { data, error, isLoading, isFetching, isError, refetch, isPlaceholderData };
};

export default useFilterQuery;
