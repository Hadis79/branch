import { useMutation } from '@tanstack/react-query';
import useCartableStore from '../store/use-cartable-store';
import Api from '../services/api';
import { ApiUtil } from '@branch-services/utils';
import { CartableQueryKeys, RequestStatusButton } from '../utils/consts';
import { invalidateQueryByKey } from './invalidate-query';

function handleError(reason) {
  return ApiUtil.getErrorMessage(reason);
}

const confirmOfflineAchRequest = async (id): Promise<any> => {
  return await Api.confirmOfflineAchRequest(id);
};

const useConfirmOfflineRequestMutation = () => {
  const { setModalType, setMessage, setStatusRequest } = useCartableStore();

  return useMutation({
    mutationFn: (id) => confirmOfflineAchRequest(id),
    onError: (error, variables, context) => {
      const customizedError = handleError(error);
      setModalType(null);
      setMessage(customizedError);
    },

    onSuccess: (data, variables, context) => {
      setStatusRequest(RequestStatusButton.SUCCESS);
      invalidateQueryByKey([CartableQueryKeys.CartableFilter]);
    },
  });
};

export default useConfirmOfflineRequestMutation;
