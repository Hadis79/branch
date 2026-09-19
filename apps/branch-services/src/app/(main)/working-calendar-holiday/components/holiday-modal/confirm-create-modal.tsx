import { useTr } from '@branch-services/translation';
import { Text } from '@branch-services/ui-kit';

import HolidayModal from './holiday-modal';

type ConfirmCreateModalProps = {
  open: boolean;
  // Translation keys of the texts, e.g. "confirm_official"
  textKey: 'confirm_official' | 'confirm_custom';
  params: Record<string, string | number>;
  confirmText: string;
  loading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

// Last check before a create form is saved
const ConfirmCreateModal = ({
  open,
  textKey,
  params,
  confirmText,
  loading,
  onConfirm,
  onCancel,
}: ConfirmCreateModalProps) => {
  const [t] = useTr();

  return (
    <HolidayModal
      open={open}
      title={t(`${textKey}_title`)}
      confirmText={t(confirmText)}
      confirmLoading={loading}
      onConfirm={onConfirm}
      onCancel={onCancel}
    >
      <Text as='span' fontWeight={400}>
        {t(`${textKey}_question`, params)}
        <br />
        {t(`${textKey}_description`)}
      </Text>
    </HolidayModal>
  );
};

export default ConfirmCreateModal;
