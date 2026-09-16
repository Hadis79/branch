import { useMutation } from '@tanstack/react-query';
import { ApiUtil } from '@branch-services/utils';
import { Api } from '../services';
import { useWidgetStore } from '../store';
import { PageKind } from '../utils/consts';

function handleError(reason: any): string {
  return ApiUtil.getErrorMessage(reason);
}

const ResetLoginAction = async (): Promise<any> => {
  return await Api.resetLogin();
};

const useResetLoginMutation = () => {
  const { setMessage, resetErrorMessage, setResetLogin } = useWidgetStore((state) => state);
  const { mutate, data, isPending, error, isError, isSuccess, reset } = useMutation({
    mutationFn: () => ResetLoginAction(),

    onError: (error, variables, context) => {
      const customizedError = handleError(error);
      setMessage(customizedError);
    },
    onSuccess: (data, variables, context) => {
      setResetLogin(data);
      setMessage(null);
      resetErrorMessage();
    },
    onSettled: (data, error, variables, context) => {
      // Error or success... doesn't matter!
    },
  });

  return { mutate, data, isPending, error, isError, isSuccess, reset };
};

export default useResetLoginMutation;
