import { useTr } from '@branch-services/translation';
import { Text } from '@branch-services/ui-kit';

import HolidayModal from './holiday-modal';

type DiscardEditModalProps = {
  open: boolean;
  onDiscard: () => void;
  onContinueEditing: () => void;
};

// Shown when leaving the edit page with an uploaded file that was not saved yet
const DiscardEditModal = ({ open, onDiscard, onContinueEditing }: DiscardEditModalProps) => {
  const [t] = useTr();

  return (
    <HolidayModal
      open={open}
      title={t('discard_edit_title')}
      confirmText={t('discard_and_exit')}
      cancelText={t('continue_editing')}
      onConfirm={onDiscard}
      onCancel={onContinueEditing}
    >
      <Text as='span' fontWeight={400}>
        {t('discard_edit_description')}
      </Text>
    </HolidayModal>
  );
};

export default DiscardEditModal;
