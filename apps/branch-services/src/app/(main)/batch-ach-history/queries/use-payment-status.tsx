import { useQuery } from '@tanstack/react-query';
import { ApiUtil } from '@branch-services/utils';
import { BatchAchHistoryQueryKeys } from '../utils/consts';
import { Api } from '../services';
import { useEffect } from 'react';
import useBatchAchHistoryStore from '../store/use-widget-store';

function handleError(reason: any): string {
  return ApiUtil.getErrorMessage(reason);
}

const getPaymentStatusAction = async (): Promise<any> => {
  return await Api.getPaymentStatus();
};

const usePaymentStatusQuery = () => {
  const { setMessage, resetMessage } = useBatchAchHistoryStore();

  const { data, error, isLoading, isFetching, isError, refetch } = useQuery({
    queryKey: [BatchAchHistoryQueryKeys.BATCH_ACH_HISTORY_PAYMENT_STATUS],
    queryFn: () => getPaymentStatusAction(),
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
