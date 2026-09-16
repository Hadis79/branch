import { QueryKeys, UserModel } from '@branch-services/types';
import { useQuery } from '@tanstack/react-query';
import useUserStore from '../stores/use-user-store';
import { Api } from '@branch-services/services';
import { useEffect, useState } from 'react';
import { ApiUtil } from '@branch-services/utils';

function handleError(reason) {
  return ApiUtil.getErrorMessage(reason);
}

const getUserProfileAction = async (): Promise<UserModel> => {
  return await Api.getUserProfile();
};

function useUserQuery() {
  const [enabledQuery, setEnabledQuery] = useState(false);
  const { user, setMessage } = useUserStore();

  const { data, isLoading, isError, error, isSuccess, refetch, isRefetchError } = useQuery({
    queryKey: [QueryKeys.USER],
    queryFn: getUserProfileAction,
    enabled: enabledQuery || !user,
  });

  const customizedError = isError && handleError(error);

  useEffect(() => {
    if (isError) {
      setMessage(customizedError);
    }
  }, [isError]);

  // useEffect(() => {
  //   if (setLoading) {
  //     if (isLoading) {
  //       setLoading(true);
  //     } else {
  //       setLoading(false);
  //     }
  //   }
  // }, [isLoading]);

  return { data, isLoading, isError, error, isSuccess, refetch, setEnabledQuery, isRefetchError };
}

export default useUserQuery;
