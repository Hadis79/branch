import { useQuery } from '@tanstack/react-query';
import { ApiUtil } from '@branch-services/utils';
import { Api } from '../services';
import { BatchAchHistoryQueryKeys } from '../utils/consts';
import { useEffect } from 'react';
import useBatchAchHistoryStore from '../store/use-widget-store';
import { DownloadExportFileParams } from '../services/api-type';

function handleError(reason: any): string {
  return ApiUtil.getErrorMessage(reason);
}

const downloadExportFileAction = async (params: DownloadExportFileParams): Promise<any> => {
  const response = await Api.downloadExportFile(params);
  if (response) {
    ApiUtil.downloadFile(response, 'application/vnd.ms-excel', 'xlsx');
    return 'File downloaded successfully';
  } else {
    throw new Error('Failed to download file');
  }
};

const useDownloadExportFileQuery = (id: string) => {
  const { setDownloadErrorMessage, resetDownloadErrorMessage } = useBatchAchHistoryStore();

  const { error, isLoading, isFetching, isError, refetch } = useQuery({
    queryKey: [BatchAchHistoryQueryKeys.BATCH_ACH_HISTORY_DOWNLOAD_EXPORT_FILE],
    queryFn: async () => await downloadExportFileAction({ id }),
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

export default useDownloadExportFileQuery;
