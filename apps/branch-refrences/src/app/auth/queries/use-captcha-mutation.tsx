import { useMutation } from '@tanstack/react-query';
import { ApiUtil } from '@branch-services/utils';
import { Api } from '../services';
import { useWidgetStore } from '../store';
import { useEffect, useRef } from 'react';

function handleError(reason: any): string {
  return ApiUtil.getErrorMessage(reason);
}

const useCaptchaMutation = () => {
  const { setCaptchaResponse, setMessage } = useWidgetStore((state) => state);
  const prevDataRef = useRef<any>(null);
  const isNewDataRef = useRef<boolean>(false);

  const CaptchaAction = async (): Promise<any> => {
    if (prevDataRef.current?.SessionId && isNewDataRef.current) {
      return false;
    } else {
      return await Api.captcha();
    }
  };

  const { mutate, data, isPending, error, isError, isSuccess, reset } = useMutation({
    mutationFn: () => CaptchaAction(),
    onMutate: () => {
      isNewDataRef.current = false;
    },
    retry: (failureCount, error) => {
      if (isNewDataRef.current && prevDataRef.current?.SessionId) return false;
      return failureCount < Infinity;
    },
    retryDelay: 1000,
    onError: (error, variables, context) => {
      const customizedError = handleError(error);
      setMessage(customizedError);
      // setCancelVerify();
    },
    onSuccess: (data, variables, context) => {
      if (data !== false) {
        setCaptchaResponse(data);
      }
      setMessage(null);
      // if (data.success) setOpenInfoModal(true);
    },
    onSettled: (data, error, variables, context) => {
      // Error or success... doesn't matter!
    },
  });

  useEffect(() => {
    if (data && data !== false && data !== prevDataRef.current) {
      isNewDataRef.current = true;
      prevDataRef.current = data;
    }
  }, [data]);

  return { mutate, data, isPending, error, isError, isSuccess, reset };
};

export default useCaptchaMutation;
