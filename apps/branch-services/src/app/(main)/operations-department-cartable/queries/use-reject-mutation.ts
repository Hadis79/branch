import { useMutation } from '@tanstack/react-query';
import Api from '../services/api';
import { ApiUtil } from '@branch-services/utils';
import { OperationsCartableQueryKeys } from '../utils/consts';
import { invalidateQueryByKey } from './invalidate-query';
import useOperationsDepartmentCartableStore from '../store/use-widget-store';

function handleError(reason) {
  return ApiUtil.getErrorMessage(reason);
}

const rejectRequest = async (id): Promise<any> => {
  return await Api.rejectRequest(id);
};

const useRejectRequestMutation = () => {
  const { setModalType, setMessage } = useOperationsDepartmentCartableStore();
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
      invalidateQueryByKey([OperationsCartableQueryKeys.OPERATIONS_CARTABLE_FILTER]);
    },

    // Optional: Handle cleanup or rollback in case of optimistic updates
    onSettled: (data, error, variables, context) => {
      console.log('Mutation settled');
      // Useful for final steps regardless of success or failure
    },
  });
};

export default useRejectRequestMutation;
