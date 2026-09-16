import { useQuery } from '@tanstack/react-query';
import { ApiUtil } from '@branch-services/utils';
import { ListRequestQueryKeys } from '../utils/consts';
import { useEffect } from 'react';
import useListRequestStore from '../store/use-widget-store';
import { DownloadRequestParams } from '@branch-services/types';
import { Api } from '../services';

function handleError(reason: any): string {
  return ApiUtil.getErrorMessage(reason);
}

const downloadRequestFileAction = async (params: DownloadRequestParams): Promise<any> => {
  const response = await Api.downloadRequestFile(params);
  if (response) {
    ApiUtil.downloadFile(response, 'application/vnd.ms-excel', params.inputFileName?.split('.')[1]);
    return 'File downloaded successfully';
  } else {
    throw new Error('Failed to download file');
  }
};

const useDownloadRequestFileQuery = (id: string, ssn: string, inputFileName?: string) => {
  const { setDownloadErrorMessage, resetDownloadErrorMessage } = useListRequestStore();

  const { error, isLoading, isFetching, isError, refetch } = useQuery({
    queryKey: [ListRequestQueryKeys.LIST_REQUEST_HISTORY_DOWNLOAD_REQUEST_FILE],
    queryFn: async () => await downloadRequestFileAction({ id, ssn, inputFileName }),
    enabled: false,
  });

  useEffect(() => {
    if (isError) {
      const customizedError = isError && handleError(error);
      setDownloadErrorMessage(customizedError);
    } else {
      resetDownloadErrorMessage();
    }
  }, [error, isError]);

  return { error, isLoading, isFetching, isError, refetch };
};

export default useDownloadRequestFileQuery;
