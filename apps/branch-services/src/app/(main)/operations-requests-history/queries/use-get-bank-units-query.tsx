import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@branch-services/types';
import { ApiUtil } from '@branch-services/utils';
import useOperationsRequestsHistoryStore from '../store/use-widget-store';
import { Api } from '@branch-services/services';

function handleError(reason: any): any {
  return ApiUtil.getErrorMessage(reason);
}

const useBankUnitsQuery = () => {
  const { setMessage, resetMessage } = useOperationsRequestsHistoryStore();

  return useQuery({
    queryKey: [QueryKeys.BANK_UNITS],
    queryFn: async () => {
      try {
        resetMessage();

        const res = await Api.getBankUnits();

        return (
          res?.map((item) => ({
            value: item.unitId,
            label: `${item.unitId} - ${item.name}`,
          })) ?? []
        );
      } catch (err) {
        setMessage(handleError(err));
        return [];
      }
    },
  });
};

export default useBankUnitsQuery;
