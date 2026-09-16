import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { ApiUtil } from '@branch-services/utils';
import { Api } from '../services';
import { useWidgetStore } from '../store';

function handleError(reason: any): string {
  return ApiUtil.getErrorMessage(reason);
}

const otpAction = async (): Promise<any> => {
  return await Api.getOtp();
};

const useOtpMutation = () => {
  const { setOtpResponse, setMessage, timer } = useWidgetStore((state) => state);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const TIMER_DURATION = 20 * 60 * 1000;

  const remainingTime = timer ? Math.max(0, TIMER_DURATION - (Date.now() - timer)) : null;

  const { mutate, data, isPending, error, isError, isSuccess, reset } = useMutation({
    // mutationFn: () => otpAction(),
    mutationFn: () => (remainingTime !== null && remainingTime !== 0 ? otpAction() : Promise.reject()),

    onError: (error) => {
      const customizedError = handleError(error);
      setMessage(customizedError);
    },

    onSuccess: (data) => {
      setOtpResponse(data);
      setMessage(null);

      setIsResendDisabled(true);

      setTimeout(() => {
        setIsResendDisabled(false);
      }, 2 * 60 * 1000);
    },

    onSettled: () => {
      // Error or success... doesn't matter!
    },
  });

  return { mutate, data, isPending, error, isError, isSuccess, reset, isResendDisabled };
};

export default useOtpMutation;
