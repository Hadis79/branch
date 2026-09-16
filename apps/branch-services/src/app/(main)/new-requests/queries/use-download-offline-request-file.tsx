import { useQuery } from '@tanstack/react-query';
import { ApiUtil, getFileExtension, getFileType } from '@branch-services/utils';

import { useEffect } from 'react';

import { Api } from '@branch-services/services';
import useNewRequestsWidgetStore from '../store/use-widget-store';
import { NEW_REQUESTS_QUERY_KEYS } from '../utils/enums';

function handleError(reason: any): string {
  return ApiUtil.getErrorMessage(reason);
}

const downloadOfflineRequestFileAction = async (id: string, inputFileName: string): Promise<string> => {
  const response = await Api.downloadOfflineRequestFile(id);

  if (!response) {
    throw new Error('Failed to download file');
  }

  const fileExtension = getFileExtension(inputFileName);
  const fileType = getFileType(inputFileName) || 'application/octet-stream';

  ApiUtil.downloadFile(response, fileType, fileExtension);

  return 'File downloaded successfully';
};

const useDownloadOfflineRequestFileQuery = (id: string, inputFileName: string) => {
  const { setDownloadErrorMessage, resetDownloadErrorMessage } = useNewRequestsWidgetStore();

  const { error, isLoading, isFetching, isError, refetch } = useQuery({
    queryKey: [NEW_REQUESTS_QUERY_KEYS.DOWNLOAD_OFFLINE_FILE_REQUEST],
    queryFn: async () => await downloadOfflineRequestFileAction(id, inputFileName),
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

export default useDownloadOfflineRequestFileQuery;
