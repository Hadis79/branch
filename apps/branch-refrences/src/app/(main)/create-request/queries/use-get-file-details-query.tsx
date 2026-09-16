import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Api } from '../services';
import { handleError } from '../utils/utils';
import useWidgetStore from '../store/use-widget-store';
import ParamUtil from '../utils/param-util';

const useFileDetailsQuery = () => {
  const { fileDetailsFilter, pagination, uploadResponse, setMessage, resetMessage, checkValidationResponse } =
    useWidgetStore((state) => state);

  const queryClient = useQueryClient();

  const fetchDetails = async () => {
    try {
      resetMessage();
      if (checkValidationResponse?.requestId) {
        return await Api.getFileDetails(
          ParamUtil.prepareFileDetailsFilterParams({
            id: checkValidationResponse?.requestId,
            fileDetailsFilter,
            pagination,
          })
        );
      } else {
        return;
      }
    } catch (e) {
      setMessage(handleError(e));
    }
  };

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['fileDetails'],
    queryFn: fetchDetails,
    enabled: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return {
    data,
    error,
    isLoading,
    refetch,
  };
};

export default useFileDetailsQuery;
