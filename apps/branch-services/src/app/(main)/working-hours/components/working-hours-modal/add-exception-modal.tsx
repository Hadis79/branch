import { Modal } from 'antd';

import { useTr } from '@branch-services/translation';
import { Text } from '@branch-services/ui-kit';

type AddExceptionModalProps = {
  open: boolean;
  onClose: () => void;
};

// The exception-creation flow has no design yet; this placeholder stands in until it does
const AddExceptionModal = ({ open, onClose }: AddExceptionModalProps) => {
  const [t] = useTr();

  return (
    <Modal open={open} centered title={t('add_exception')} footer={null} onCancel={onClose}>
      <Text as='span' fontWeight={400}>
        {t('exception_coming_soon_description')}
      </Text>
    </Modal>
  );
};

export default AddExceptionModal;
