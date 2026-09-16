import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { Api } from '@branch-services/services';
import { ApiUtil, getFileExtension, getFileType } from '@branch-services/utils';

import { BatchAchHistoryQueryKeys } from '../utils/consts';
import useBatchAchHistoryStore from '../store/use-widget-store';

function handleError(reason: unknown): string {
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
  const { setDownloadErrorMessage, resetDownloadErrorMessage } = useBatchAchHistoryStore();

  const { error, isLoading, isFetching, isError, refetch } = useQuery({
    queryKey: [BatchAchHistoryQueryKeys.DOWNLOAD_OFFLINE_FILE_REQUEST, id, inputFileName],
    queryFn: () => downloadOfflineRequestFileAction(id, inputFileName),
    enabled: false,
  });

  useEffect(() => {
    if (isError) {
      setDownloadErrorMessage(handleError(error));
      return;
    }

    resetDownloadErrorMessage();
  }, [error, isError, resetDownloadErrorMessage, setDownloadErrorMessage]);

  return {
    error,
    isLoading,
    isFetching,
    isError,
    refetch,
  };
};

export default useDownloadOfflineRequestFileQuery;
