import { useMutation } from '@tanstack/react-query';
import { ApiUtil } from '@branch-services/utils';
import { Api } from '../services';
import { useWidgetStore } from '../store';

export type VerifyParams = {
  ssn: string | undefined;
  mobileNumber: string | undefined;
  captcha: string | undefined;
};

function handleError(reason: any): string {
  return ApiUtil.getErrorMessage(reason);
}

const VerifyAction = async (params: VerifyParams, remainingTime): Promise<any> => {
  if (remainingTime !== null) {
    return await Api.verify(params);
  }
};

const useVerifyMutation = () => {
  const { setVerifyResponse: setVerifyResponse, setMessage, timer } = useWidgetStore((state) => state);

  const TIMER_DURATION = 20 * 60 * 1000;

  const remainingTime = timer ? Math.max(0, TIMER_DURATION - (Date.now() - timer)) : null;
  const { mutate, data, isPending, error, isError, isSuccess, reset } = useMutation({
    // mutationFn: (formValues: VerifyParams) => VerifyAction(formValues),
    mutationFn: (formValues: VerifyParams) =>
      remainingTime !== null && remainingTime !== 0 ? VerifyAction(formValues, remainingTime) : Promise.reject(),

    onError: (error, variables, context) => {
      const customizedError = handleError(error);
      setMessage(customizedError);
      // setCancelVerify();
    },
    onSuccess: (data, variables, context) => {
      setVerifyResponse(data);
      setMessage(null);
      // if (data.success) setOpenInfoModal(true);
    },
    onSettled: (data, error, variables, context) => {
      // Error or success... doesn't matter!
    },
  });

  return { mutate, data, isPending, error, isError, isSuccess, reset };
};

export default useVerifyMutation;
