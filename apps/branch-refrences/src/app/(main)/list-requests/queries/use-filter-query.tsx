import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { ApiUtil } from '@branch-services/utils';
import { ListRequestQueryKeys } from '../utils/consts';
import { Api } from '../services';
import ParamUtil from '../utils/param-util';
import useListRequestStore from '../store/use-widget-store';
import { useEffect } from 'react';
import { HistoryPaginationParams, HistoryParams } from '../services/api-type';

function handleError(reason: any): string {
  return ApiUtil.getErrorMessage(reason);
}

const getFilterAction = async (params: HistoryParams, pagination: HistoryPaginationParams): Promise<any> => {
  return await Api.getHistory(ParamUtil.prepareParams({ params: { requestDto: params } }), pagination);
};

const useFilterQuery = () => {
  const { filter, pagination, setMessage, resetMessage } = useListRequestStore();
  const { data, error, isLoading, isFetching, isError, refetch, isPlaceholderData } = useQuery({
    queryKey: [ListRequestQueryKeys.LIST_REQUEST_HISTORY_DATA_TABLE, pagination, filter],
    queryFn: () => getFilterAction(filter, pagination),
    // refetchOnMount: 'always',
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (error) {
      const customizedError = isError && handleError(error);
      setMessage(customizedError as any);
    } else resetMessage();
  }, [error]);

  // useEffect(() => {
  //   resetMessage();
  // }, [isFetching]);

  return { data, error, isLoading, isFetching, isError, refetch, isPlaceholderData };
};

export default useFilterQuery;
