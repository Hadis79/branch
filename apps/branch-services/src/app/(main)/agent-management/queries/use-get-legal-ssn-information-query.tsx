import { useQuery } from '@tanstack/react-query';
import { ApiUtil } from '@branch-services/utils';
import { AGENT_MANAGEMENT_QUERY_KEYS, StepRoute } from '../utils/enums';
import { Api } from '../services';
import useAgentManagementWidgetStore from '../store/use-widget-store';

function handleError(reason: any): string {
  return ApiUtil.getErrorMessage(reason);
}

const useGetLegalSsnInformationQuery = () => {
  const { filter, setMessage, resetMessage, setOrgInfo } = useAgentManagementWidgetStore();
  return useQuery({
    queryKey: [AGENT_MANAGEMENT_QUERY_KEYS.LEGAL_SSN, filter],
    queryFn: async () => {
      try {
        resetMessage();
        const res = await Api.getLegalSsnInformation(filter);
        if (res) {
          setOrgInfo(res?.response?.customerInfo);
        }
        return res;
      } catch (e) {
        setMessage(handleError(e));
      }
    },
    enabled: false,
  });
};

export default useGetLegalSsnInformationQuery;
