import { useMutation } from '@tanstack/react-query';
import { ApiUtil } from '@branch-services/utils';
import { Api } from '../services';

function handleError(reason: any): string {
  return ApiUtil.getErrorMessage(reason);
}

const CardOtpAction = async (): Promise<any> => {
  return await Api.getLogOutServices();
};

const useLogOutMutation = () => {
  const { mutate, data, isPending, error, isError, isSuccess, reset } = useMutation({
    mutationFn: () => CardOtpAction(),

    onError: (error, variables, context) => {
      const customizedError = handleError(error);
    },
    onSuccess: (data, variables, context) => {},
    onSettled: (data, error, variables, context) => {
      // Error or success... doesn't matter!
    },
  });

  return { mutate, data, isPending, error, isError, isSuccess, reset };
};

export default useLogOutMutation;
