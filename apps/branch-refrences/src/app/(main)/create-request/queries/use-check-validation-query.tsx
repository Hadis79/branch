import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Api } from '../services';
import { handleError } from '../utils/utils';
import useWidgetStore from '../store/use-widget-store';

type UseCheckValidationOptions = {
  manual?: boolean;
};

const useCheckValidationQuery = (clientSsn?: string | null, options?: UseCheckValidationOptions) => {
  const {
    checkValidationResponse,
    resetUploadResponse,
    setCheckValidationResponse,
    setMessage,
    uploadResponse,
    activeStep,
    openDraft,
  } = useWidgetStore((state) => state);

  const manual = options?.manual ?? false;

  const query = useQuery({
    queryKey: ['check-validation', clientSsn],
    gcTime: 0,
    staleTime: 0,
    queryFn: async () => {
      try {
        const res = await Api.getCheckValidation({ id: uploadResponse?.id, clientSsn });
        res === '' && resetUploadResponse();
        if (res) {
          setCheckValidationResponse(res);
        }
        return res;
      } catch (e) {
        setMessage(handleError(e));
      }
    },
    enabled: !manual && (activeStep === 0 || activeStep === 1 || activeStep === 2 || activeStep === 3),

    refetchInterval: (activeStep === 2 || openDraft) && !checkValidationResponse?.finished ? 5000 : false,
    refetchOnMount: 'always',
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
  });

  return {
    ...query,
    manualFetch: query.refetch,
  };
};

export default useCheckValidationQuery;
