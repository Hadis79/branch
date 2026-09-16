import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Api } from '../services';
import { NEW_REQUESTS_QUERY_KEYS } from '../utils/enums';
import useNewRequestsWidgetStore from '../store/use-widget-store';
import { handleError } from '../utils/utils';
import ParamUtil from '../utils/param-util';

const useUserFileDetailsQuery = (params) => {
  const { fileDetailsFilter, pagination, transactionKeys, setMessage, resetMessage } = useNewRequestsWidgetStore();
  return useQuery({
    queryKey: [NEW_REQUESTS_QUERY_KEYS.USER_FILE_DETAILS, pagination, fileDetailsFilter, transactionKeys],
    queryFn: async () => {
      try {
        resetMessage();
        return await Api.getUserFileDetails(
          ParamUtil.prepareUserFileDetailsFilterParams({
            requestId: params?.requestId,
            fileDetailsFilter,
            pagination,
          })
        );
      } catch (e) {
        setMessage(handleError(e));
      }
    },
    refetchOnMount: 'always',
    placeholderData: keepPreviousData,
  });
};

export default useUserFileDetailsQuery;
