import { useQuery } from '@tanstack/react-query';
import { ApiUtil } from '@branch-services/utils';
import { BatchAchHistoryQueryKeys } from '../utils/consts';
import { useEffect } from 'react';
import useBatchAchHistoryStore from '../store/use-widget-store';
import { DownloadRequestParams } from '@branch-services/types';
import { Api } from '@branch-services/services';

function handleError(reason: any): string {
  return ApiUtil.getErrorMessage(reason);
}

const downloadRequestFileAction = async (params: DownloadRequestParams): Promise<any> => {
  const response = await Api.downloadRequestFile(params);
  if (response) {
    ApiUtil.downloadFile(response, 'application/vnd.ms-excel', 'xlsx');
    return 'File downloaded successfully';
  } else {
    throw new Error('Failed to download file');
  }
};

const useDownloadRequestFileQuery = (id: string, ssn: string) => {
  const { setDownloadErrorMessage, resetDownloadErrorMessage } = useBatchAchHistoryStore();

  const { error, isLoading, isFetching, isError, refetch } = useQuery({
    queryKey: [BatchAchHistoryQueryKeys.BATCH_ACH_HISTORY_DOWNLOAD_REQUEST_FILE],
    queryFn: async () => await downloadRequestFileAction({ id, ssn }),
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
