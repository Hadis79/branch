import { useQuery } from '@tanstack/react-query';
import Api from './details-history-table-api';
import { ApiUtil } from '@branch-services/utils';
import { FileDetailsQueryKeys } from '../utils/consts';
import { ApiParams } from './types';
import { Statuses } from './consts';

function handleError(reason) {
  return ApiUtil.getErrorMessage(reason);
}

const cacheStatus = [
  Statuses.INITIATED,
  Statuses.ACTIVE,
  Statuses.INACTIVE,
  Statuses.VALIDATION_SUCCESS,
  Statuses.VALIDATION_FAILURE,
  Statuses.NONE,
];

const getFileDetails = async (params: ApiParams): Promise<any> => {
  const { status, requestType } = params;
  if (cacheStatus.includes(status) || requestType === 'OFFLINE_ACH') {
    return await Api.getFileDetailsStatus(params);
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
