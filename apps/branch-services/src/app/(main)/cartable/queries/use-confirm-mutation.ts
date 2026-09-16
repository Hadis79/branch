import { useMutation } from '@tanstack/react-query';
import useCartableStore from '../store/use-cartable-store';
import Api from '../services/api';
import { ApiUtil } from '@branch-services/utils';
import { CartableQueryKeys, RequestStatusButton } from '../utils/consts';
import { invalidateQueryByKey } from './invalidate-query';

function handleError(reason) {
  return ApiUtil.getErrorMessage(reason);
}

const confirmRequest = async (id): Promise<any> => {
  return await Api.confirmRequest(id);
};

const useConfirmRequestMutation = () => {
  const { setModalType, setMessage, setStatusRequest } = useCartableStore();

  return useMutation({
    mutationFn: (id) => confirmRequest(id), // Mutation function that calls the API

    // Handle error scenario
    onError: (error, variables, context) => {
      const customizedError = handleError(error);
      setModalType(null);
      setMessage(customizedError);
      // You can add user notifications or state updates for errors here
    },

    // Handle success scenario
    onSuccess: (data, variables, context) => {
      setStatusRequest(RequestStatusButton.SUCCESS);
      invalidateQueryByKey([CartableQueryKeys.CartableFilter]);
      // setStatusRequest(RequestStatusButton.SUCCESS);
    },

    // Optional: Handle cleanup or rollback in case of optimistic updates
    onSettled: (data, error, variables, context) => {
      console.log('Mutation settled');
      // Useful for final steps regardless of success or failure
    },
  });
};

export default useConfirmRequestMutation;
