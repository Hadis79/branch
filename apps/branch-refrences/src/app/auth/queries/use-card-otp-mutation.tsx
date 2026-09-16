import { useMutation } from '@tanstack/react-query';
import { ApiUtil } from '@branch-services/utils';
import { Api } from '../services';
import { useWidgetStore } from '../store';

export type CardOtpParams = {
  panNo: string | undefined;
  cvv2: string | undefined;
  expDate: string | undefined;
};

function handleError(reason: any): string {
  return ApiUtil.getErrorMessage(reason);
}

const CardOtpAction = async (params: CardOtpParams): Promise<any> => {
  return await Api.cardOtp(params);
};

const useCardOtpMutation = () => {
  const { setCardOtpResponse: setCardOtpResponse, setMessage, timer } = useWidgetStore((state) => state);
  const TIMER_DURATION = 20 * 60 * 1000;

  const remainingTime = timer ? Math.max(0, TIMER_DURATION - (Date.now() - timer)) : null;
  const { mutate, data, isPending, error, isError, isSuccess, reset } = useMutation({
    // mutationFn: (formValues: CardOtpParams) => CardOtpAction(formValues),
    mutationFn: (formValues: CardOtpParams) =>
      remainingTime !== null && remainingTime !== 0 ? CardOtpAction(formValues) : Promise.reject(),
    networkMode: 'always',

    onError: (error, variables, context) => {
      const customizedError = handleError(error);
      setMessage(customizedError);
    },
    onSuccess: (data, variables, context) => {
      setCardOtpResponse(data);
      setMessage(null);
      // if (data.success) setOpenInfoModal(true);
    },
    onSettled: (data, error, variables, context) => {
      // Error or success... doesn't matter!
    },
  });

  return { mutate, data, isPending, error, isError, isSuccess, reset };
};

export default useCardOtpMutation;
