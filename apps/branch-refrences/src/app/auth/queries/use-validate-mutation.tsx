import { useMutation } from '@tanstack/react-query';
import { ApiUtil } from '@branch-services/utils';
import { Api } from '../services';
import { useWidgetStore } from '../store';

export type ValidateParams = {
  otp: string | undefined;
};

function handleError(reason: any): string {
  return ApiUtil.getErrorMessage(reason);
}

const ValidateAction = async (params: ValidateParams, remainingTime): Promise<any> => {
  return await Api.validateOtp(params);
};

const useValidateMutation = () => {
  const { setValidateResponse: setValidateResponse, setMessage, timer } = useWidgetStore((state) => state);
  const TIMER_DURATION = 20 * 60 * 1000;

  const remainingTime = timer ? Math.max(0, TIMER_DURATION - (Date.now() - timer)) : null;
  const { mutate, data, isPending, error, isError, isSuccess, reset } = useMutation({
    // mutationFn: (formValues: ValidateParams) => ValidateAction(formValues),
    mutationFn: (formValues: ValidateParams) =>
      remainingTime !== null && remainingTime !== 0 ? ValidateAction(formValues, remainingTime) : Promise.reject(),

    onError: (error, variables, context) => {
      const customizedError = handleError(error);
      setMessage(customizedError);
      // setCancelValidate();
    },
    onSuccess: (data, variables, context) => {
      setValidateResponse(data);
      setMessage(null);
      // if (data.success) setOpenInfoModal(true);
    },
    onSettled: (data, error, variables, context) => {
      // Error or success... doesn't matter!
    },
  });

  return { mutate, data, isPending, error, isError, isSuccess, reset };
};

export default useValidateMutation;
