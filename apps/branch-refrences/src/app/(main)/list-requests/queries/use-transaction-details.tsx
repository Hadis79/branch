import { useQuery } from '@tanstack/react-query';
import { ApiUtil } from '@branch-services/utils';
import { useEffect, useState } from 'react';
import { Api } from '../services';
import { useListRequestStore } from '../store';
import { Statuses } from '../utils/consts';
function handleError(reason: any): string {
  return ApiUtil.getErrorMessage(reason);
}

const cacheStatus = [
  Statuses.INITIATED,
  Statuses.ACTIVE,
  Statuses.INACTIVE,
  Statuses.VALIDATION_SUCCESS,
  Statuses.VALIDATION_FAILURE,
  Statuses.NONE,
];

const getTransactionDetailsAction = async (requestId, status, requestType): Promise<any> => {
  if (cacheStatus.includes(status) || requestType === 'OFFLINE_ACH') {
    return await Api.getInqueryDetailsCache(requestId, requestType);
  } else {
    return await Api.getInqueryDetails(requestId);
  }
};

const useTransactionModalDetailsQuery = (requestId, status, requestType) => {
  const { setMessage, resetMessage } = useListRequestStore();
  const { data, error, isLoading, isFetching, isError, isSuccess, isFetched, refetch } = useQuery({
    queryKey: [requestId],
    queryFn: () => getTransactionDetailsAction(requestId, status, requestType),
    enabled: !!requestId,
  });

  const customizedError = isError && handleError(error);

  useEffect(() => {
    if (error) {
      const customizedError = isError && handleError(error);
      setMessage(customizedError as any);
    } else resetMessage();
  }, [error]);

  return {
    data,
    error: customizedError,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    isFetched,
    refetch,
  };
};

export default useTransactionModalDetailsQuery;
