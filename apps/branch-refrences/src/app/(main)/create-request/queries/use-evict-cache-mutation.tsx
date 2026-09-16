import { ApiUtil } from '@branch-services/utils';
import { Api } from '../services';
import { PageRoute, PaymentType, REQUEST_LIST_LINK, RequestStatus } from '../utils/consts';
import { useMutation } from '@tanstack/react-query';
import { useWidgetStore } from '../store';
import { MessageModel } from '@branch-services/types';
import { useTr } from '@branch-services/translation';
import { usePathname } from 'next/navigation';

function handleError(reason: any): string {
  return ApiUtil.getErrorMessage(reason);
}

const EvictCacheAction = async (id): Promise<any> => {
  return await Api.evictCache(id);
};

const useEvictCacheMutation = (isUpload?: boolean) => {
  const [t] = useTr();
  const pathname = usePathname();
  const {
    setEvictCache,
    setMessage,
    setActiveStep,
    resetFormValues,
    resetUploadFileForm,
    resetValidate,
    setOpenNewRequestSheet,
  } = useWidgetStore((state) => state);
  const isUploadSet = isUpload ? isUpload : false;
  const { mutate, data, isPending, error, isError, isSuccess, reset } = useMutation({
    mutationFn: (id) => EvictCacheAction(id),

    onError: (error) => {
      const customizedError = handleError(error);
      // setEvictCache(error);
      setMessage(customizedError);
    },

    onSuccess: () => {
      setEvictCache(true);
      if (!isUploadSet) {
        setActiveStep(0);
        resetFormValues();
        resetUploadFileForm();
        resetValidate();
        window.history.pushState({}, '', `${pathname}?step=${PageRoute.SUBMIT}`);
        setOpenNewRequestSheet(false);
      }
    },
  });

  return { mutate, data, isPending, error, isError, isSuccess, reset };
};

export default useEvictCacheMutation;
