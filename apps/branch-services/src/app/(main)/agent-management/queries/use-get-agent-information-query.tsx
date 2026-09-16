import { useQuery } from '@tanstack/react-query';
import { ApiUtil } from '@branch-services/utils';
import useWidgetStore from '../store/use-widget-store';
import { AGENT_MANAGEMENT_QUERY_KEYS } from '../utils/enums';
import { Api } from '../services';

function handleError(reason: any): string {
  return ApiUtil.getErrorMessage(reason);
}

const useGetAgentInformationQuery = () => {
  const { setMessage, resetMessage, userInfo } = useWidgetStore();
  return useQuery({
    queryKey: [AGENT_MANAGEMENT_QUERY_KEYS.AGENT_INFORMATION, userInfo?.SSN],
    queryFn: async () => {
      try {
        resetMessage();
        return await Api.getAgentInformation({ userSsn: userInfo?.SSN });
      } catch (e) {
        setMessage(handleError(e));
      }
    },
    enabled: false,
  });
};

export default useGetAgentInformationQuery;
