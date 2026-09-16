import { useQuery } from '@tanstack/react-query';
import Api from './account-selector-api';
import { ApiUtil } from '@branch-services/utils';
import { ACCOUNT_SELECTOR_QUERY_KEY } from './account-selector-type';

function handleError(reason) {
  return ApiUtil.getErrorMessage(reason);
}

const getAccountsNumber = async (legalId: string | null, accountNumber): Promise<any> => {
  if (accountNumber?.id !== undefined) {
    return await Api.getBalance(legalId, accountNumber?.id);
  } else {
    return null;
  }
};

const useBalanceQuery = (legalId: string | null, accountNumber) => {
  const { data, error, isLoading, isPending, isError, refetch } = useQuery({
    queryKey: [ACCOUNT_SELECTOR_QUERY_KEY, accountNumber, legalId],
    queryFn: () => getAccountsNumber(legalId, accountNumber),
    enabled: !!legalId || !!accountNumber,
    gcTime: 0,
    staleTime: 0,
  });

  const customizedError = isError && handleError(error);

  return { data, error: customizedError, isLoading, isPending, isError, refetch };
};

export default useBalanceQuery;
