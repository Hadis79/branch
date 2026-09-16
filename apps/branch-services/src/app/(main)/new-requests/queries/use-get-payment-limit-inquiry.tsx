import { useQuery } from '@tanstack/react-query';
import { Api } from '../services';
import useNewRequestsWidgetStore from '../store/use-widget-store';
import { handleError } from '../utils/utils';
import { NEW_REQUESTS_QUERY_KEYS } from '../utils/enums';

const usePaymentLimitInquiryQuery = () => {
  const { setMessage, resetMessage, historyData } = useNewRequestsWidgetStore();
  return useQuery({
    queryKey: [NEW_REQUESTS_QUERY_KEYS.PAYMENT_LIMIT_INQUIRY],
    queryFn: async () => {
      try {
        resetMessage();
        const res = await Api.getPaymentLimitInquiry({ paymentType: historyData.paymentType });
        return res;
      } catch (err) {
        setMessage(handleError(err));
      }
    },
    enabled: false,
  });
};

export default usePaymentLimitInquiryQuery;
