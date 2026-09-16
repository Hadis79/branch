import { useMutation } from '@tanstack/react-query';
import { ApiUtil } from '@branch-services/utils';
import { Api } from '../services';
import { useWidgetStore } from '../store';

export type BankUnitsParams = {
  criteria: string | undefined;
};

function handleError(reason: any): string {
  return ApiUtil.getErrorMessage(reason);
}

const BankUnitsAction = async (params: BankUnitsParams): Promise<any> => {
  return await Api.bankUnits(params);
};

const useBankUnitsMutation = () => {
  const { setBankUnitsResponse: setBankUnitsResponse, setMessage } = useWidgetStore((state) => state);
  const { mutate, data, isPending, error, isError, isSuccess, reset } = useMutation({
    mutationFn: (formValues: BankUnitsParams) => BankUnitsAction(formValues),

    onError: (error, variables, context) => {
      const customizedError = handleError(error);
      setMessage(customizedError);
    },
    onSuccess: (data, variables, context) => {
      setBankUnitsResponse(data);
      setMessage(null);
    },
    onSettled: (data, error, variables, context) => {},
  });

  return { mutate, data, isPending, error, isError, isSuccess, reset };
};

export default useBankUnitsMutation;
