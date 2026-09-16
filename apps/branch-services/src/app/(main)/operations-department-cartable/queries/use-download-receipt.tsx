import { useQuery } from '@tanstack/react-query';
import { ApiUtil } from '@branch-services/utils';
import { useEffect } from 'react';
import { DownloadReceiptParams, QueryKeys } from '@branch-services/types';
import { Api } from '@branch-services/services';
import useOperationsDepartmentCartableStore from '../store/use-widget-store';

function handleError(reason: any): string {
  return ApiUtil.getErrorMessage(reason);
}

const downloadReceiptAction = async (params: DownloadReceiptParams): Promise<any> => {
  const response = await Api.downloadReceipt(params);
  if (response) {
    ApiUtil.downloadFile(response, 'application/pdf', 'pdf');
    return 'File downloaded successfully';
  } else {
    throw new Error('Failed to download file');
  }
};

const useDownloadReceiptQuery = (requestId: string) => {
  const { setDownloadErrorMessage, resetDownloadErrorMessage } = useOperationsDepartmentCartableStore();

  const { error, isLoading, isFetching, isError, refetch, isRefetchError } = useQuery({
    queryKey: [QueryKeys.DOWNLOAD_RECEIPT, requestId],
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

export default useDownloadReceiptQuery;
