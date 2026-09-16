import { useQuery } from '@tanstack/react-query';
import { ApiUtil } from '@branch-services/utils';
import { NEW_REQUESTS_QUERY_KEYS } from '../utils/enums';
import { Api } from '../services';
import useNewRequestsWidgetStore from '../store/use-widget-store';

function handleError(reason: any): string {
  return ApiUtil.getErrorMessage(reason);
}

const useTransactionModalDetailsQuery = () => {
  const { transactionKeys, setMessage, setOpenTransactionDetails } = useNewRequestsWidgetStore();
  return useQuery({
    queryKey: [NEW_REQUESTS_QUERY_KEYS.TRANSACTION_DETAILS, transactionKeys?.id],
    queryFn: async () => {
      try {
        const res = await Api.getTransactionDetails({ requestId: transactionKeys?.id });
        if (res) {
          setOpenTransactionDetails(true);
        }
        return res;
      } catch (err) {
        const errorMessage = handleError(err);
        setMessage(errorMessage);
      }
    },
    enabled: false,
  });
};

export default useTransactionModalDetailsQuery;
