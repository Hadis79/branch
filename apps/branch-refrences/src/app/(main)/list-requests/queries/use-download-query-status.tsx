import { useQuery } from '@tanstack/react-query';
import { ApiUtil } from '@branch-services/utils';
import { ListRequestQueryKeys } from '../utils/consts';
import { useEffect } from 'react';
import useListRequestStore from '../store/use-widget-store';
import { DownloadReceiptParams } from '@branch-services/types';
import { Api } from '@branch-services/services';

function handleError(reason: any): string {
  return ApiUtil.getErrorMessage(reason);
}

const downloadReceiptAction = async (params: DownloadReceiptParams): Promise<any> => {
  const response = await Api.downloadReceiptQueryStatus(params);
  if (response) {
    ApiUtil.downloadFile(response, 'application/vnd.ms-excel', 'xlsx');
    return 'File downloaded successfully';
  } else {
    throw new Error('Failed to download file');
  }
};

const useDownloadReceiptQueryStatus = (requestId: string) => {
  const { setDownloadErrorMessage, resetDownloadErrorMessage } = useListRequestStore();

  const { error, isLoading, isFetching, isError, refetch, isRefetchError } = useQuery({
    queryKey: [ListRequestQueryKeys.QUERY_STATUS_DOWNLOAD_RECEIPT, requestId],
    queryFn: async () => await downloadReceiptAction({ requestId }),
    enabled: false,
  });

  useEffect(() => {
    if (error) {
      const customizedError = isError && handleError(error);
      setDownloadErrorMessage(customizedError);
    } else {
      resetDownloadErrorMessage();
    }
  }, [error]);

  return { error, isLoading, isFetching, isError, refetch, isRefetchError };
};

export default useDownloadReceiptQueryStatus;
