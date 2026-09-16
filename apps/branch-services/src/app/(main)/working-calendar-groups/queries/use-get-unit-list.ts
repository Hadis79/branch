import { useQuery } from '@tanstack/react-query';
import { ApiUtil } from '@branch-services/utils';
import { Api } from '../services';
import { GroupUnit } from '../utils/types';
import { groupQueryKeys } from '../utils/constants';

function handleError(reason: any): string {
  return ApiUtil.getErrorMessage(reason);
}

const useGetUnitList = () => {
  const { data, error, isLoading, isFetching, isError, refetch } = useQuery<GroupUnit[]>({
    queryKey: groupQueryKeys.units,
    queryFn: Api.getUnitList,
  });

  const customizedError = isError && handleError(error);

  return { data, error: customizedError, isLoading, isFetching, isError, refetch };
};

export default useGetUnitList;
