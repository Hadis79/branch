import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Api } from '../services';
import { NEW_REQUESTS_QUERY_KEYS, PageKind, StepRoute } from '../utils/enums';
import useNewRequestsWidgetStore from '../store/use-widget-store';
import { handleError } from '../utils/utils';

const getCheckValidationAction = async (params): Promise<any> => {
  return await Api.getCheckValidation(params);
};

const useCheckValidationQuery = () => {
  const {
    filter,
    pageKind,
    checkValidationResponse,
    transactionKeys,
    setCheckValidationResponse,
    setMessage,
    setPageKind,
    setStep,
    resetPagination,
  } = useNewRequestsWidgetStore();
  return useQuery({
    queryKey: [NEW_REQUESTS_QUERY_KEYS.CHECK_VALIDATION, filter],
    queryFn: async () => {
      try {
        const res = await Api.getCheckValidation({ id: transactionKeys?.id, ssn: transactionKeys?.ssn });
        if (res) {
          setCheckValidationResponse(res);
          setPageKind(PageKind.STEPPER);
          setStep(StepRoute.VALIDATION_STEP);
          resetPagination();
        }
        return res;
      } catch (e) {
        setMessage(handleError(e));
      }
    },
    enabled: pageKind === PageKind.STEPPER,
    refetchInterval: pageKind === PageKind.STEPPER && !checkValidationResponse.finished ? 5000 : false,
    refetchOnMount: 'always',
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
  });
};

export default useCheckValidationQuery;
