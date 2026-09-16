import { useQuery } from '@tanstack/react-query';
import { OperationsCartableQueryKeys } from '../utils/consts';
import Api from '../services/api';
import ParamUtil from '../utils/param-util';
import { ApiUtil } from '@branch-services/utils';
import { useEffect, useState } from 'react';
import useOperationsDepartmentCartableStore from '../store/use-widget-store';

function handleError(reason) {
  return ApiUtil.getErrorMessage(reason);
}

const getFilterAction = async (params): Promise<any> => {
  return await Api.getCartableOperation(ParamUtil.prepareCartableParams(params));
};

const useFilterQuery = () => {
  const { filter, pagination, setMessage } = useOperationsDepartmentCartableStore();

  const { data, error, isLoading, isPending, isError, isFetching, refetch } = useQuery({
    queryKey: [OperationsCartableQueryKeys.OPERATIONS_CARTABLE_FILTER, pagination.current, filter],
    refetchOnMount: 'always',
    queryFn: () => getFilterAction({ pagination, filter }),
  });

  const customizedError = isError && handleError(error);

  useEffect(() => {
    if (isError) {
      setMessage(customizedError);
    }
  }, [isError]);

  return { data, error, isLoading, isPending, isError, refetch, isFetching };
};
export default useFilterQuery;
