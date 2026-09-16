import { useQuery } from '@tanstack/react-query';
import Api from './account-selector-api';
import { ApiUtil } from '@branch-services/utils';
import { ACCOUNT_SELECTOR_QUERY_KEY } from './account-selector-type';
import { validateNationalCode } from './account-selector-utils';

function handleError(reason) {
  return ApiUtil.getErrorMessage(reason);
}

const getAccountsNumber = async (legalId: string, accountNumber?: string): Promise<any> => {
  const validLegalId = validateNationalCode(legalId) ? legalId : null;
  return validLegalId && (await Api.getAccounts(legalId, accountNumber));
};

const useAccountsQuery = (legalId: string, accountNumber: string) => {
  const { data, error, isLoading, isPending, isError, refetch } = useQuery({
    queryKey: [ACCOUNT_SELECTOR_QUERY_KEY, legalId, accountNumber],
    queryFn: () => getAccountsNumber(legalId, accountNumber),
    enabled: !!legalId || !!accountNumber,
  });

  const customizedError = isError && handleError(error);

  return { data, error: customizedError, isLoading, isPending, isError, refetch };
};

export default useAccountsQuery;
