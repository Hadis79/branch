import { useTr } from '@branch-services/translation';
import { Text } from '@branch-services/ui-kit';

import WorkingHoursModal from './working-hours-modal';
import { formatHour } from '../../utils/utils';

type ConfirmCreateModalProps = {
  open: boolean;
  from?: string;
  to?: string;
  loading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

// Last check before the bank's default working hours are saved
const ConfirmCreateModal = ({ open, from, to, loading, onConfirm, onCancel }: ConfirmCreateModalProps) => {
  const [t] = useTr();

  return (
    <WorkingHoursModal
      open={open}
      title={t('confirm_create_title')}
      confirmText={t('confirm_final')}
      confirmLoading={loading}
      onConfirm={onConfirm}
      onCancel={onCancel}
    >
      <Text as='span' fontWeight={400}>
        {t('confirm_create_description', { from: formatHour(from ?? ''), to: formatHour(to ?? '') })}
      </Text>
    </WorkingHoursModal>
  );
};

export default ConfirmCreateModal;
