import { useMutation } from '@tanstack/react-query';
import Api from '../services/api';
import { ApiUtil } from '@branch-services/utils';
import { OperationsCartableQueryKeys, RequestStatusButton } from '../utils/consts';
import { invalidateQueryByKey } from './invalidate-query';
import useOperationsDepartmentCartableStore from '../store/use-widget-store';

function handleError(reason) {
  return ApiUtil.getErrorMessage(reason);
}

const confirmRequest = async (id): Promise<any> => {
  return await Api.approveOfflineRequest(id);
};

const useConfirmRequestMutation = () => {
  const { setModalType, setMessage, setStatusRequest } = useOperationsDepartmentCartableStore();

  return useMutation({
    mutationFn: (id) => confirmRequest(id),

    onError: (error, variables, context) => {
      const customizedError = handleError(error);
      setModalType(null);
      setMessage(customizedError);
    },

    onSuccess: (data, variables, context) => {
      setStatusRequest(RequestStatusButton.SUCCESS);
      invalidateQueryByKey([OperationsCartableQueryKeys.OPERATIONS_CARTABLE_FILTER]);
      setModalType(null);
    },
  });
};

export default useConfirmRequestMutation;
