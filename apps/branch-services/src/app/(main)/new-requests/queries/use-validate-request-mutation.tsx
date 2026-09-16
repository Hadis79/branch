import { Api } from '../services';
import { useMutation } from '@tanstack/react-query';
import { handleError } from '../utils/utils';
import useNewRequestsWidgetStore from '../store/use-widget-store';
import { NEW_REQUESTS_QUERY_KEYS, PageKind } from '../utils/enums';

const validateRequestAction = async (requestId): Promise<any> => {
  return await Api.postValidateRequest(requestId);
};

const useValidateRequestMutation = () => {
  const { setMessage, setValidateResponse, setPageKind, resetPagination } = useNewRequestsWidgetStore();
  return useMutation({
    mutationKey: [NEW_REQUESTS_QUERY_KEYS.VALIDATE_REQUEST],
    mutationFn: validateRequestAction,
    onError: (error) => {
      const customizedError = handleError(error);
      setMessage(customizedError);
    },

    onSuccess: (data, variables, context) => {
      setValidateResponse(data);
      setPageKind(PageKind.STEPPER);
      resetPagination();
    },
  });
};

export default useValidateRequestMutation;
