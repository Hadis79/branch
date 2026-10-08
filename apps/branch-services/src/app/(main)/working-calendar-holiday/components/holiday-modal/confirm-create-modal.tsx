import { useTr } from '@branch-services/translation';
import { Text } from '@branch-services/ui-kit';

import HolidayModal from './holiday-modal';
import { CONFIRM_CREATE_LABELS } from '../../utils/constants';

type ConfirmCreateModalProps = {
  open: boolean;
  kind: keyof typeof CONFIRM_CREATE_LABELS;
  loading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

// Last check before a create form is saved
const ConfirmCreateModal = ({ open, kind, loading, onConfirm, onCancel }: ConfirmCreateModalProps) => {
  const [t] = useTr();
  const { title, description } = CONFIRM_CREATE_LABELS[kind];

  return (
    <HolidayModal
      open={open}
      title={t(title)}
      confirmText={t('confirm')}
      confirmLoading={loading}
      onConfirm={onConfirm}
      onCancel={onCancel}
    >
      <Text as='span' fontWeight={400}>
        {t(description)}
      </Text>
    </HolidayModal>
  );
};

export default ConfirmCreateModal;
