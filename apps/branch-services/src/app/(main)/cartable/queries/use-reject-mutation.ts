import { useMutation } from '@tanstack/react-query';
import useCartableStore from '../store/use-cartable-store';
import Api from '../services/api';
import { ApiUtil } from '@branch-services/utils';
import { CartableQueryKeys } from '../utils/consts';
import { invalidateQueryByKey } from './invalidate-query';

function handleError(reason) {
  return ApiUtil.getErrorMessage(reason);
}

const rejectRequest = async (id): Promise<any> => {
  return await Api.rejectRequest(id);
};

const useRejectRequestMutation = () => {
  const { setModalType, setMessage } = useCartableStore();
  // const { invalidateFilterQuery } = useFilterQuery();

  return useMutation({
    mutationFn: (id) => rejectRequest(id), // Mutation function that calls the API

    // Handle error scenario
    onError: (error, variables, context) => {
      const customizedError = handleError(error);
      setModalType(null);
      setMessage(customizedError);
      // You can add user notifications or state updates for errors here
    },

    // Handle success scenario
    onSuccess: (data, variables, context) => {
      setModalType(null);
      invalidateQueryByKey([CartableQueryKeys.CartableFilter]);
    },

    // Optional: Handle cleanup or rollback in case of optimistic updates
    onSettled: (data, error, variables, context) => {
      console.log('Mutation settled');
      // Useful for final steps regardless of success or failure
    },
  });
};

export default useRejectRequestMutation;
