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
  const response = await Api.downloadReceiptBranchUser(params);
  if (response) {
    ApiUtil.downloadFile(response, 'application/pdf', 'pdf');
    return 'File downloaded successfully';
  } else {
    throw new Error('Failed to download file');
  }
};

const useDownloadReceiptQuery = (requestId: string, requestType: string) => {
  const { setDownloadErrorMessage, resetDownloadErrorMessage } = useListRequestStore();

  const { error, isLoading, isFetching, isError, refetch, isRefetchError } = useQuery({
    queryKey: [ListRequestQueryKeys.LIST_REQUEST_HISTORY_DOWNLOAD_RECEIPT, requestId],
    queryFn: async () => await downloadReceiptAction({ requestId, requestType }),
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

export default useDownloadReceiptQuery;
