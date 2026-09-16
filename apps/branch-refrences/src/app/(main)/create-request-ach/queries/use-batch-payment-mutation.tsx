import { ApiUtil } from '@branch-services/utils';
import { Api } from '../services';
import { PaymentType, REQUEST_LIST_LINK, RequestStatus } from '../utils/consts';
import { useMutation } from '@tanstack/react-query';
import { useWidgetStore } from '../store';
import { MessageModel } from '@branch-services/types';
import { useTr } from '@branch-services/translation';
export type BatchAchRequestParams = {
  id: string;
  ssn: string;
  title: string;
  accountNumber: string;
  accountBranchCode: string;
  withdrawalId: string;
  description: string;
  paymentType: PaymentType;
  statementCode: string;
  totalAmount: number;
  totalRecords: number;
  duplicateRecordCount: number;
  wageAmount: number;
  wageDiscount: number;
  wageOriginalAmount: number;
  withWithdraw: boolean;
  paymentId?: number;
};

function handleError(reason: any): string {
  return ApiUtil.getErrorMessage(reason);
}

const createBatchPaymentRequestAction = async (): Promise<any> => {
  return await Api.createBatchRequest();
};

const useBatchPaymentMutation = () => {
  const [t] = useTr();
  const { setRequestStatus, setMessage } = useWidgetStore((state) => state);
  const { mutate, data, isPending, error, isError, isSuccess, reset } = useMutation({
    mutationFn: () => createBatchPaymentRequestAction(),

    onError: (error) => {
      const customizedError = handleError(error);
      setRequestStatus(RequestStatus.TRY_AGAIN);
      setMessage(customizedError);
    },

    onSuccess: () => {
      setRequestStatus(RequestStatus.SUCCESS);
      const successMessage: MessageModel = {
        txt: 'batch_ach_requesst_success_message',
        type: 'success',
        shouldTranslate: true,
        linkProps: {
          title: t('batch_ach_request_list'),
          url: REQUEST_LIST_LINK,
        },
      };
      setMessage(successMessage);
    },
  });

  return { mutate, dataFinal: data, isPending, error, isError, isSuccess, reset };
};

export default useBatchPaymentMutation;
