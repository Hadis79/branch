import { useMutation } from '@tanstack/react-query';
import useCartableStore from '../store/use-cartable-store';
import Api from '../services/api';
import { ApiUtil } from '@branch-services/utils';
import { CartableQueryKeys } from '../utils/consts';
import { invalidateQueryByKey } from './invalidate-query';

function handleError(reason) {
  return ApiUtil.getErrorMessage(reason);
}

const rejectOfflineRequest = async (id): Promise<any> => {
  return await Api.rejectOfflineRequest(id);
};

const useRejectOfflineRequestMutation = () => {
  const { setModalType, setMessage } = useCartableStore();
  // const { invalidateFilterQuery } = useFilterQuery();

  return useMutation({
    mutationFn: (id) => rejectOfflineRequest(id),

    onError: (error, variables, context) => {
      const customizedError = handleError(error);
      setModalType(null);
      setMessage(customizedError);
    },

    onSuccess: (data, variables, context) => {
      setModalType(null);
      invalidateQueryByKey([CartableQueryKeys.CartableFilter]);
    },
  });
};

export default useRejectOfflineRequestMutation;
