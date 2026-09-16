import { useMutation } from '@tanstack/react-query';
import { ApiUtil } from '@branch-services/utils';
import { Api } from '../services';
import { useWidgetStore } from '../store';

export type CardListParams = {
  userSSN: string | undefined;
};

function handleError(reason: any): string {
  return ApiUtil.getErrorMessage(reason);
}

const CardListAction = async (params: CardListParams): Promise<any> => {
  return await Api.cardList(params);
};

const useCardListMutation = () => {
  const { setVerifyResponse: setCardListResponse, setMessage, timer } = useWidgetStore((state) => state);
  const TIMER_DURATION = 20 * 60 * 1000;

  const remainingTime = timer ? Math.max(0, TIMER_DURATION - (Date.now() - timer)) : null;
  const { mutate, data, isPending, error, isError, isSuccess, reset } = useMutation({
    mutationFn: (formValues: CardListParams) =>
      remainingTime !== null && remainingTime !== 0 ? CardListAction(formValues) : Promise.reject(),
    // CardListAction(formValues),

    onError: (error, variables, context) => {
      const customizedError = handleError(error);
      setMessage(customizedError);
      // setCancelVerify();
    },
    onSuccess: (data, variables, context) => {
      setCardListResponse(data);
      setMessage(null);
      // if (data.success) setOpenInfoModal(true);
    },
    onSettled: (data, error, variables, context) => {
      // Error or success... doesn't matter!
    },
  });

  return { mutate, data, isPending, error, isError, isSuccess, reset };
};

export default useCardListMutation;
