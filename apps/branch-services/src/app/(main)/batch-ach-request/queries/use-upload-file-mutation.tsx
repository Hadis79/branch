import { useMutation } from '@tanstack/react-query';
import { ApiUtil } from '@branch-services/utils';
import { Api } from '../services';
import { useWidgetStore } from '../store';
import { PaymentType } from '../utils/consts';

export type UploadFileParams = {
  file: File | undefined;
  ssn: string;
  accountNumber: string;
  paymentType: PaymentType | undefined;
  allowSplitPaya: boolean | undefined;
};

function handleError(reason: any): string {
  return ApiUtil.getErrorMessage(reason);
}

const uploadFileAction = async (params: UploadFileParams): Promise<any> => {
  return await Api.uploadFile(params);
};

const useUploadFileMutation = () => {
  const { setUploadResponse, setMessage, setCancelUpload, setOpenInfoModal } = useWidgetStore((state) => state);
  const { mutate, data, isPending, error, isError, isSuccess, reset } = useMutation({
    mutationFn: (formValues: UploadFileParams) => uploadFileAction(formValues),

    onError: (error, variables, context) => {
      const customizedError = handleError(error);
      setMessage(customizedError);
      setCancelUpload();
    },
    onSuccess: (data, variables, context) => {
      setUploadResponse(data);
      setMessage(null);
      if (data.success) setOpenInfoModal(true);
    },
    onSettled: (data, error, variables, context) => {
      // Error or success... doesn't matter!
    },
  });

  return { mutate, data, isPending, error, isError, isSuccess, reset };
};

export default useUploadFileMutation;
