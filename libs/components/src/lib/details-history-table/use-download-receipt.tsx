import { ApiUtil } from '@branch-services/utils';
import { ListRequestQueryKeys } from '../utils/consts';
import { DownloadReceiptParams } from '@branch-services/types';
import useFileDetailsTableStore from './details-history-table-store';
import Api from './details-history-table-api';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

function handleError(reason: any): string {
  return ApiUtil.getErrorMessage(reason);
}

const downloadReceiptAction = async (params: DownloadReceiptParams): Promise<any> => {
  const response = await Api.downloadReceiptBranchUser(params);

  if (response) {
    ApiUtil.downloadFile(response, 'application/pdf', 'pdf');
    return 'File downloaded successfully';
  }

  throw new Error('Failed to download file');
};

const useDownloadReceiptQuery = () => {
  const queryClient = useQueryClient();
  const { setDownloadErrorMessage, resetDownloadErrorMessage } = useFileDetailsTableStore();
  const [downloadingId, setDownloadingId] = useState<string | undefined | null>(null);

  const refetch = async (params: DownloadReceiptParams) => {
    try {
      resetDownloadErrorMessage();
      setDownloadingId(params?.detailsId);
      return await queryClient.fetchQuery({
        queryKey: [ListRequestQueryKeys.LIST_REQUEST_HISTORY_DOWNLOAD_RECEIPT, params],
        queryFn: () => downloadReceiptAction(params),
        networkMode: 'always',
      });
    } catch (error) {
      const msg = handleError(error);
      setDownloadErrorMessage(msg);
    } finally {
      setDownloadingId(null);
    }
  };

  return { refetch, downloadingId };
};

export default useDownloadReceiptQuery;
