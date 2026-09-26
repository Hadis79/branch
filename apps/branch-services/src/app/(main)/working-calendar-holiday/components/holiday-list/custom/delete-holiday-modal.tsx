import { useTr } from '@branch-services/translation';
import { Text } from '@branch-services/ui-kit';
import { ApiUtil } from '@branch-services/utils';

import HolidayModal from '../../holiday-modal/holiday-modal';
import useDeleteCustomMutation from '../../../queries/use-delete-custom-mutation';
import useHolidayStore from '../../../store/use-widget-store';
import type { CustomHoliday } from '../../../utils/types';
import { formatDate } from '../../../utils/utils';

type DeleteHolidayModalProps = {
  holiday: CustomHoliday | null;
  // The deleted row was the last one of its page
  isLastRow: boolean;
  onClose: () => void;
};

const DeleteHolidayModal = ({ holiday, isLastRow, onClose }: DeleteHolidayModalProps) => {
  const [t] = useTr();
  const page = useHolidayStore((state) => state.customPagination.page);
  const setPagination = useHolidayStore((state) => state.setCustomPagination);
  const setMessage = useHolidayStore((state) => state.setMessage);
  const { mutate, isPending } = useDeleteCustomMutation();

  const handleConfirm = () => {
    if (!holiday) return;

    mutate(
      { provinceName: holiday.province.provinceName, date: holiday.date },
      {
        onSuccess: () => {
          setMessage({ txt: 'delete_success', type: 'success', shouldTranslate: true });
          if (isLastRow && page > 1) setPagination({ page: page - 1 });
        },
        onError: (error) => setMessage(ApiUtil.getErrorMessage(error)),
        onSettled: onClose,
      }
    );
  };

  return (
    <HolidayModal
      open={Boolean(holiday)}
      danger
      title={t('delete_title')}
      confirmText={t('delete')}
      confirmLoading={isPending}
      onConfirm={handleConfirm}
      onCancel={onClose}
    >
      <Text as='span'>{holiday && t('delete_question', { title: holiday.title, date: formatDate(holiday.date) })}</Text>
    </HolidayModal>
  );
};

export default DeleteHolidayModal;
