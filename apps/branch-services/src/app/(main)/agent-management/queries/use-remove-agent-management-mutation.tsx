import { Api } from '../services';
import { useMutation } from '@tanstack/react-query';
import { AGENT_MANAGEMENT_QUERY_KEYS } from '../utils/enums';
import { ApiUtil } from '@branch-services/utils';
import useAgentManagementWidgetStore from '../store/use-widget-store';

const removeAgentAction = async (params): Promise<any> => {
  return await Api.removeAgent(params);
};

function handleError(reason: any): string {
  return ApiUtil.getErrorMessage(reason);
}

const useRemoveAgentMutation = () => {
  const { setMessage } = useAgentManagementWidgetStore();

  return useMutation({
    mutationKey: [AGENT_MANAGEMENT_QUERY_KEYS.REMOVE_AGENT],
    mutationFn: removeAgentAction,
    onSuccess: (data, variables, context) => {},

    onError: (error) => {
      const errorMessage = handleError(error);
      setMessage(errorMessage);
    },
  });
};

export default useRemoveAgentMutation;
