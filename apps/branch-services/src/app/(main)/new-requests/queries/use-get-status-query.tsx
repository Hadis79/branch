import { useQuery } from '@tanstack/react-query';
import { Api } from '../services';
import useNewRequestsWidgetStore from '../store/use-widget-store';
import { handleError } from '../utils/utils';
import { NEW_REQUESTS_QUERY_KEYS } from '../utils/enums';

const useGetStatusesQuery = () => {
  const { setMessage, resetMessage } = useNewRequestsWidgetStore();
  return useQuery({
    queryKey: [NEW_REQUESTS_QUERY_KEYS.STATUSES],
    queryFn: async () => {
      try {
        resetMessage();
        const res = await Api.getStatuses();
        if (res) {
          return res?.map((item) => {
            return {
              value: item?.code?.toString().trim(),
              label: item?.persianTitle,
            };
          });
        }
      } catch (err) {
        setMessage(handleError(err));
      }
    },
  });
};

export default useGetStatusesQuery;
