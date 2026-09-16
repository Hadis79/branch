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

const useApproveOfflineAchRequestMutation = () => {
  const [t] = useTr();
  const { setMessage, setRequestStatus } = useNewRequestsWidgetStore();
  return useMutation({
    mutationKey: [NEW_REQUESTS_QUERY_KEYS.APPROVE_OFFLINE_ACH_REQUEST],
    mutationFn: async (params: any) => await Api.postApproveOfflineAchRequest(params?.id),
    onError: (error) => {
      const customizedError = handleError(error);
      setMessage(customizedError);
    },

    onSuccess: () => {
      setRequestStatus(RequestStatus.SUCCESS);
      const successMessage: MessageModel = {
        txt: 'offline_ach_bulk_deposit_request_created_successfully',
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

export default useApproveOfflineAchRequestMutation;
