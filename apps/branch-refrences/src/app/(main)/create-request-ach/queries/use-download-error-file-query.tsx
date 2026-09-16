import { useQuery } from '@tanstack/react-query';
import { ApiUtil } from '@branch-services/utils';
import { Api } from '../services';
import { QueryKeys } from '@branch-services/types';
import { useWidgetStore } from '../store';

function handleError(reason: any): string {
  return ApiUtil.getErrorMessage(reason);
}

const downloadErrorFileAction = async (params): Promise<any> => {
  const response = await Api.downloadErrorFile(params);
  if (response) ApiUtil.downloadFile(response, 'application/vnd.ms-excel', 'xlsx');
};

const useDownloadErrorFileQuery = () => {
  const { uploadResponse, formValues } = useWidgetStore((state) => state);
  const { data, error, isLoading, isFetching, isError, refetch } = useQuery({
    queryKey: [QueryKeys.DOWNLOAD_ERROR_FILE],
    queryFn: async () => await downloadErrorFileAction({ fileId: uploadResponse?.requestId, ssn: formValues.ssn }),
    enabled: false,
  });

  const customizedError = isError && handleError(error);

  return { data, error: customizedError, isLoading, isFetching, isError, refetch };
};

export default useDownloadErrorFileQuery;
