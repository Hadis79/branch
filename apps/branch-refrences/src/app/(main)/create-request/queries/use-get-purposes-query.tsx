import { useQuery } from '@tanstack/react-query';
import { ApiUtil } from '@branch-services/utils';
import { Api } from '../services';
import { QueryKeys } from '@branch-services/types';
import { useEffect } from 'react';
import { useWidgetStore } from '../store';
import { usePurposeInLocalStorage } from '../store/use-widget-store';

function handleError(reason: any): string {
  return ApiUtil.getErrorMessage(reason);
}

const getPurposesAction = async (): Promise<any> => {
  return await Api.getPurposes();
};

const usePurposesQuery = () => {
  const { purposes } = useWidgetStore((state) => state);
  const { setPurposesAction } = usePurposeInLocalStorage();
  const { data, error, isLoading, isFetching, isError, isSuccess, refetch } = useQuery({
    queryKey: [QueryKeys.PURPOSES],
    queryFn: getPurposesAction,
    enabled: !purposes,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setPurposesAction(data);
    }
  }, [data, isSuccess]);

  const customizedError = isError && handleError(error);

  return { data, error: customizedError, isLoading, isFetching, isError, refetch };
};

export default usePurposesQuery;
