import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Api } from '../services';
import ParamUtil from '../utils/param-util';
import { NEW_REQUESTS_QUERY_KEYS } from '../utils/enums';
import useNewRequestsWidgetStore from '../store/use-widget-store';
import { handleError } from '../utils/utils';

const useHistoryQuery = () => {
  const filter = useNewRequestsWidgetStore((state) => state.filter);
  const pagination = useNewRequestsWidgetStore((state) => state.pagination);
  const setMessage = useNewRequestsWidgetStore((state) => state.setMessage);
  const resetMessage = useNewRequestsWidgetStore((state) => state.resetMessage);

  return useQuery({
    queryKey: [NEW_REQUESTS_QUERY_KEYS.HISTORY, filter, pagination],
    queryFn: async () => {
      try {
        resetMessage();
        return await Api.getHistory(ParamUtil.prepareHistoryParams({ filter, pagination }));
      } catch (e) {
        setMessage(handleError(e));
      }
    },
    refetchOnMount: 'always',
    placeholderData: keepPreviousData,
  });
};

export default useHistoryQuery;
