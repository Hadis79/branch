import { useQuery } from '@tanstack/react-query';
import { ApiUtil } from '@branch-services/utils';
import { AGENT_MANAGEMENT_QUERY_KEYS, StepRoute } from '../utils/enums';
import { Api } from '../services';
import useAgentManagementWidgetStore from '../store/use-widget-store';

function handleError(reason: any): string {
  return ApiUtil.getErrorMessage(reason);
}

const useGetSsnInformationQuery = () => {
  const { filter, setMessage, resetMessage, step, setUserInfo } = useAgentManagementWidgetStore();
  return useQuery({
    queryKey: [AGENT_MANAGEMENT_QUERY_KEYS.SSN, filter],
    queryFn: async () => {
      try {
        resetMessage();
        const res = await Api.getSsnInformation(filter);
        if (res && step === StepRoute.NATIONAL_ID) {
          setUserInfo(res);
        }
        return res;
      } catch (e) {
        setMessage(handleError(e));
      }
    },
    enabled: false,
  });
};

export default useGetSsnInformationQuery;
