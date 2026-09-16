import { Api } from '../services';
import { useMutation } from '@tanstack/react-query';
import { AGENT_MANAGEMENT_QUERY_KEYS, StepRoute } from '../utils/enums';
import { MessageModel } from '@branch-services/types';
import useAgentManagementWidgetStore from '../store/use-widget-store';
import { ApiUtil } from '@branch-services/utils';

function handleError(reason: any): string {
  return ApiUtil.getErrorMessage(reason);
}

const useSubmitAgentMutation = () => {
  const { resetMessage, setMessage, setStep, setAgentResponse } = useAgentManagementWidgetStore();
  return useMutation({
    mutationKey: [AGENT_MANAGEMENT_QUERY_KEYS.CONFIRMATION],
    mutationFn: async (params: any) => {
      resetMessage();
      const res = await Api.submitAgent(params);
      return res;
    },
    onError: (error) => {
      const customizedError = handleError(error);
      setMessage(customizedError);
    },

    onSuccess: (data, variables, context) => {
      const successMessage: MessageModel = {
        txt: 'success_message',
        type: 'success',
        shouldTranslate: true,
      };
      setAgentResponse(data);
      setMessage(successMessage);
      setStep(StepRoute.CONFIRMATION);
    },
  });
};

export default useSubmitAgentMutation;
