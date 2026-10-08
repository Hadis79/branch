import { useTr } from '@branch-services/translation';
import { Text } from '@branch-services/ui-kit';

import HolidayModal from '../holiday-modal/holiday-modal';

type DeleteHolidayModalProps = {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  confirmLoading?: boolean;
  holidayTitle?: string;
};

const DeleteHolidayModal = ({ holidayTitle, ...modalProps }: DeleteHolidayModalProps) => {
  const [t] = useTr();

  return (
    <HolidayModal {...modalProps} danger title={t('delete_title', { title: holidayTitle })} confirmText={t('delete')}>
      <Text as='span' fontWeight={400}>
        {t('delete_question')}
      </Text>
    </HolidayModal>
  );
};

export default DeleteHolidayModal;
