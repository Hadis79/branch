import { useTr } from '@branch-services/translation';
import { Text } from '@branch-services/ui-kit';

import WorkingHoursModal from './working-hours-modal';
import type { WorkingHoursException } from '../../utils/types';

type DeleteExceptionModalProps = {
  exception: WorkingHoursException | null;
  loading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

const DeleteExceptionModal = ({ exception, loading, onConfirm, onCancel }: DeleteExceptionModalProps) => {
  const [t] = useTr();

  return (
    <WorkingHoursModal
      open={Boolean(exception)}
      title={t('delete_exception_title')}
      confirmText={t('delete')}
      confirmLoading={loading}
      danger
      onConfirm={onConfirm}
      onCancel={onCancel}
    >
      <Text as='span' fontWeight={400}>
        {t('delete_exception_confirmation', { title: exception?.title ?? '' })}
      </Text>
    </WorkingHoursModal>
  );
};

export default DeleteExceptionModal;
