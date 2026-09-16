import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Api } from '../services';
import { NEW_REQUESTS_QUERY_KEYS } from '../utils/enums';
import useNewRequestsWidgetStore from '../store/use-widget-store';
import { handleError } from '../utils/utils';
import ParamUtil from '../utils/param-util';

const useFileDetailsQuery = () => {
  const { fileDetailsFilter, pagination, transactionKeys, setMessage, resetMessage } = useNewRequestsWidgetStore();

  return useQuery({
    queryKey: [NEW_REQUESTS_QUERY_KEYS.FILE_DETAILS, pagination, fileDetailsFilter, transactionKeys],
    queryFn: async () => {
      try {
        resetMessage();
        return await Api.getFileDetails(
          ParamUtil.prepareFileDetailsFilterParams({
            id: transactionKeys?.id,
            ssn: transactionKeys?.ssn,
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

export default useFileDetailsQuery;
