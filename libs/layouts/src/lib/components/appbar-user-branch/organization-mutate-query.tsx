import { useQuery } from '@tanstack/react-query';
import { ApiUtil } from '@branch-services/utils';
import { Api } from '../../services';
import { useWidgetStore } from '../../store';
import React from 'react';

export type OrganizationParams = {
  otp?: string;
  search?: string;
  page?: number;
  limit?: number;
};

function handleError(reason: any): string {
  return ApiUtil.getErrorMessage(reason);
}

const getOrganizationAction = async (params: OrganizationParams): Promise<any> => {
  return await Api.getOrganizationList();
};

const useOrganizationQuery = (params: OrganizationParams) => {
  const { setOrganizationResponse, setMessage } = useWidgetStore((state) => state);
  const { data, error, isLoading, isFetching, isError, refetch } = useQuery({
    queryKey: ['organizations', params],
    queryFn: () => getOrganizationAction(params),
    staleTime: 60_000,
  });

  React.useEffect(() => {
    if (data) setOrganizationResponse(data);
  }, [data, setOrganizationResponse]);

  React.useEffect(() => {
    if (isError && error) {
      const customError = handleError(error);
      setMessage(customError);
    }
  }, [isError, error, setMessage]);

  return {
    data,
    error,
    isLoading,
    isFetching,
    isError,
    refetch,
  };
};

export default useOrganizationQuery;
