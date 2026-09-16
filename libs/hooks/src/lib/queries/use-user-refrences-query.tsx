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
  return await Api.getUserRefrencesProfile();
};

function useUserRefrencesQuery() {
  const [enabledQuery, setEnabledQuery] = useState(false);
  const { user, setMessage, setUserAction } = useUserStore();

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

  useEffect(() => {
    // The delegation coordinator writes a successful switch itself. This
    // query hydrates only an empty store (initial load or recovery), so a
    // delayed result from an older request cannot replace an active profile.
    if (isSuccess && data && !user) {
      setUserAction(data);
    }
  }, [data, isSuccess, user, setUserAction]);

  return { data, isLoading, isError, error, isSuccess, refetch, setEnabledQuery, isRefetchError };
}

export default useUserRefrencesQuery;
