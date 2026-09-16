import { useQuery } from '@tanstack/react-query';
import Api from './file-details-table-api';
import { ApiUtil } from '@branch-services/utils';
import { FileDetailsQueryKeys } from '../utils/consts';
import { ApiParams } from './types';

function handleError(reason) {
  return ApiUtil.getErrorMessage(reason);
}

const getFileDetails = async (params: ApiParams): Promise<any> => {
  const { uploadFile } = params;
  if (uploadFile) {
    return await Api.getFileDetailsBranchUser(params);
  } else {
    return await Api.getFileDetails(params);
  }
};

const useFileDetailsQuery = (params: ApiParams) => {
  const { filter, ...rest } = params;
  const { data, error, isLoading, isPending, isError, refetch, isFetching } = useQuery({
    queryKey: [FileDetailsQueryKeys.FileDetails, rest],
    queryFn: () => getFileDetails(params),
    refetchOnMount: 'always',
  });

  const customizedError = isError && handleError(error);

  return { data, error: customizedError, isLoading, isPending, isError, refetch, isFetching };
};

export default useFileDetailsQuery;
