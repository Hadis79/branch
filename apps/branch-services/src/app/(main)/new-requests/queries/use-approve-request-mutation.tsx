import { Api } from '../services';
import { useMutation } from '@tanstack/react-query';
import { handleError } from '../utils/utils';
import useNewRequestsWidgetStore from '../store/use-widget-store';
import { NEW_REQUESTS_QUERY_KEYS, RequestStatus } from '../utils/enums';
import { REQUEST_LIST_LINK } from '../../batch-ach-request/utils/consts';
import { MessageModel } from '@branch-services/types';
import { useTr } from '@branch-services/translation';

// const approveRequestAction = async (params): Promise<any> => {
//   return await Api.postApproveRequest(params);
// };

const useApproveRequestMutation = () => {
  const [t] = useTr();
  const { setMessage, setRequestStatus } = useNewRequestsWidgetStore();
  return useMutation({
    mutationKey: [NEW_REQUESTS_QUERY_KEYS.APPROVE_REQUEST],
    mutationFn: async (params: any) => await Api.postApproveRequest(params, params?.id, params?.ssn),
    onError: (error) => {
      const customizedError = handleError(error);
      setMessage(customizedError);
    },

    onSuccess: () => {
      setRequestStatus(RequestStatus.SUCCESS);
      const successMessage: MessageModel = {
        txt: 'batch_ach_request_success_message',
        type: 'success',
        shouldTranslate: true,
        linkProps: {
          title: t('request_list'),
          url: REQUEST_LIST_LINK,
        },
      };
      setMessage(successMessage);
    },
  });
};

export default useApproveRequestMutation;
