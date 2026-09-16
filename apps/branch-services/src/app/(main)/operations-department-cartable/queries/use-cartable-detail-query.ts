import { ApiUtil } from '@branch-services/utils';
import Api from '../services/api';
import { useQuery } from '@tanstack/react-query';
import { OperationsCartableQueryKeys } from '../utils/consts';

function handleError(reason: any): string {
  return ApiUtil.getErrorMessage(reason);
}

const getCartableAction = async (requestTracingCode: string): Promise<any> => {
  return await Api.getCartableDetail(requestTracingCode);
};

const useCartableDetailQuery = (requestTracingCode: string) => {
  const { data, error, isLoading, isFetching, isError, refetch } = useQuery({
    queryKey: [OperationsCartableQueryKeys.OPERATIONS_CARTABLE_DETAILS, requestTracingCode],
    queryFn: () => getCartableAction(requestTracingCode),
    enabled: false,
  });

  const customizedError = isError && handleError(error);

  return { data, error: customizedError, isLoading, isFetching, isError, refetch };
};

export default useCartableDetailQuery;
