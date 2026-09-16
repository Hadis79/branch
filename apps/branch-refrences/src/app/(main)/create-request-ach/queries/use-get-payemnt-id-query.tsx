import { useQuery } from '@tanstack/react-query';
import { ApiUtil } from '@branch-services/utils';
import { Api } from '../services';
import { BatchAchRequestQueryKeys } from '../utils/consts';

function handleError(reason: any): string {
  return ApiUtil.getErrorMessage(reason);
}

const getPaymentIdAction = async (accountNumber, amount): Promise<any> => {
  return await Api.getPaymentId(accountNumber, amount);
};

const usePaymentIdQuery = (accountNumber, amount, chequeMethodMood) => {
  const { data, error, isLoading, isFetching, isError, refetch } = useQuery({
    queryKey: [BatchAchRequestQueryKeys.PAYMENT_ID, accountNumber, amount],
    queryFn: () => getPaymentIdAction(accountNumber, amount),
    enabled: chequeMethodMood && !!(accountNumber || amount),
  });

  const customizedError = isError && handleError(error);

  return { data, error: customizedError, isLoading, isFetching, isError, refetch };
};

export default usePaymentIdQuery;
