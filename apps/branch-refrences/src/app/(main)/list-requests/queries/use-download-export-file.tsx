import { useQuery } from '@tanstack/react-query';
import { ApiUtil } from '@branch-services/utils';
import { Api } from '../services';
import { ListRequestQueryKeys } from '../utils/consts';
import { useEffect } from 'react';
import useListRequestStore from '../store/use-widget-store';

function handleError(reason: any): string {
  return ApiUtil.getErrorMessage(reason);
}

export type ExportFileParams = {
  ssn: string | undefined;
  id: string;
  page?: number | undefined;
  size?: number | undefined;
};

const downloadExportFileAction = async (params: ExportFileParams): Promise<any> => {
  const response = await Api.downloadExportFile(params);
  if (response) {
    ApiUtil.downloadFile(response, 'application/vnd.ms-excel', 'xlsx');
    return 'File downloaded successfully';
  } else {
    throw new Error('Failed to download file');
  }
};

const useDownloadExportFileQuery = (formValues: ExportFileParams | undefined) => {
  const { setDownloadErrorMessage, resetDownloadErrorMessage } = useListRequestStore();

  const query = useQuery({
    queryKey: [ListRequestQueryKeys.LIST_REQUEST_HISTORY_DOWNLOAD_EXPORT_FILE, formValues],
    queryFn: async ({ queryKey }) => {
      const [, params] = queryKey as [string, ExportFileParams];
      return await downloadExportFileAction(params);
    },
    enabled: false,
  });

  const { error, isLoading, isFetching, isError } = query;

  useEffect(() => {
    if (isError) {
      const customizedError = handleError(error);
      setDownloadErrorMessage(customizedError);
    } else {
      resetDownloadErrorMessage();
    }
  }, [error, isError, setDownloadErrorMessage, resetDownloadErrorMessage]);

  return query;
};

export default useDownloadExportFileQuery;
