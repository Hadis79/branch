import { CartableModalsEnum } from '../../utils/consts';
import ConfirmModal from './confirm-modal/confirm-modal';
import RejectModal from './reject-modal/reject-modal';

import { useTr } from '@branch-services/translation';

export const useModalsList = () => {
  const { t } = useTr();

  const modalsList = {
    [CartableModalsEnum.REJECT_BATCH_REQUEST]: {
      title: t('reject_modal_title'),
      component: <RejectModal />,
    },
    [CartableModalsEnum.CONFIRM_REQUEST]: {
      title: t(''),
      component: <ConfirmModal />,
    },
  };

  return { modalsList };
};
