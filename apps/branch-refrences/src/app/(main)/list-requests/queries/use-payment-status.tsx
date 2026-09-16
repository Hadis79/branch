import { useQuery } from '@tanstack/react-query';
import { ApiUtil } from '@branch-services/utils';
import { ListRequestQueryKeys } from '../utils/consts';
import { Api } from '../services';
import { useEffect } from 'react';
import useListRequestStore from '../store/use-widget-store';

function handleError(reason: any): string {
  return ApiUtil.getErrorMessage(reason);
}

const getPaymentStatusAction = async (): Promise<any> => {
  return await Api.getPaymentStatus();
};

const usePaymentStatusQuery = () => {
  const { setMessage, resetMessage } = useListRequestStore();

  const { data, error, isLoading, isFetching, isError, refetch } = useQuery({
    queryKey: [ListRequestQueryKeys.LIST_REQUEST_HISTORY_PAYMENT_STATUS],
    queryFn: () => getPaymentStatusAction(),
    enabled: true,
    gcTime: 0,
    staleTime: 0,
  });

  const customizedError = isError && handleError(error);

  useEffect(() => {
    if (error) {
      const customizedError = isError && handleError(error);
      setMessage(customizedError as any);
    } else resetMessage();
  }, [error]);

  return { data, error: customizedError, isLoading, isFetching, isError, refetch };
};

export default usePaymentStatusQuery;
