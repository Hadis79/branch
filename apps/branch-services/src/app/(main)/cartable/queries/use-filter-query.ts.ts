import { useQuery } from '@tanstack/react-query';
import useCartableStore from '../store/use-cartable-store';
import { CartableQueryKeys } from '../utils/consts';
import Api from '../services/api';
import ParamUtil from '../utils/param-util';
import { ApiUtil } from '@branch-services/utils';
import { useEffect, useState } from 'react';

function handleError(reason) {
  return ApiUtil.getErrorMessage(reason);
}

const getFilterAction = async (params): Promise<any> => {
  return await Api.getCartable(ParamUtil.prepareCartableParams(params));
};

const useFilterQuery = () => {
  const { filter, pagination, setMessage } = useCartableStore();

  const { data, error, isLoading, isPending, isError, isFetching, refetch } = useQuery({
    queryKey: [CartableQueryKeys.CartableFilter, pagination.current, filter],
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
