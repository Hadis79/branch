import { useQuery } from '@tanstack/react-query';
import { ApiUtil } from '@branch-services/utils';
import { Api } from './transaction-modal.api';
import { TransactionModalDetailsQueryKeys } from '../utils/consts';
import { useState } from 'react';

function handleError(reason: any): string {
  return ApiUtil.getErrorMessage(reason);
}

const getTransactionDetailsAction = async (ssn, id): Promise<any> => {
  return await Api.getInqueryDetails(ssn, id);
};

const useTransactionModalDetailsQuery = (ssn, id) => {
  const [enable, setEnable] = useState(false);
  const { data, error, isLoading, isFetching, isError, isSuccess, isFetched } = useQuery({
    queryKey: [TransactionModalDetailsQueryKeys.TRANSACTION_MODAL_DETAILS, ssn, id],
    queryFn: () => getTransactionDetailsAction(ssn, id),
    enabled: enable,
  });

  const customizedError: any = isError && handleError(error);

  return {
    data,
    error: customizedError,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    isFetched,
    setEnable,
  };
};

export default useTransactionModalDetailsQuery;
