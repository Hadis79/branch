import { useQuery } from '@tanstack/react-query';
import { ApiUtil } from '@branch-services/utils';
import { Api } from '../services';
import { QueryKeys } from '@branch-services/types';
import useNewRequestsWidgetStore from '../store/use-widget-store';

function handleError(reason: any): string {
  return ApiUtil.getErrorMessage(reason);
}

const downloadErrorFileAction = async (params): Promise<any> => {
  const response = await Api.downloadErrorFile(params);
  if (response) ApiUtil.downloadFile(response, 'application/vnd.ms-excel', 'xlsx');
};

const useDownloadErrorFileQuery = () => {
  const { transactionKeys } = useNewRequestsWidgetStore((state) => state);
  const { data, error, isLoading, isFetching, isError, refetch } = useQuery({
    queryKey: [QueryKeys.DOWNLOAD_ERROR_FILE],
    queryFn: async () => await downloadErrorFileAction({ id: transactionKeys?.id, ssn: transactionKeys?.ssn }),
    enabled: false,
  });

  const customizedError = isError && handleError(error);

  return { data, error: customizedError, isLoading, isFetching, isError, refetch };
};

export default useDownloadErrorFileQuery;
