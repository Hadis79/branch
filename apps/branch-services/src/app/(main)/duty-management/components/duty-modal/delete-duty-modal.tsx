import { useTr } from '@branch-services/translation';
import { Box, Text } from '@branch-services/ui-kit';

import DutyModal from './duty-modal';
import type { Duty } from '../../utils/types';

type DeleteDutyModalProps = {
  duty: Duty | null;
  loading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

const DeleteDutyModal = ({ duty, loading, onConfirm, onCancel }: DeleteDutyModalProps) => {
  const [t] = useTr();

  return (
    <DutyModal
      open={Boolean(duty)}
      title={t('delete_duty_title', { title: duty?.title ?? '' })}
      confirmText={t('delete')}
      confirmLoading={loading}
      danger
      onConfirm={onConfirm}
      onCancel={onCancel}
    >
      <Box flexDirection='column' gap='0.4rem'>
        <Text as='span' fontWeight={400}>
          {t('delete_duty_question')}
        </Text>
        <Text as='span' fontWeight={400}>
          {t('delete_duty_description')}
        </Text>
      </Box>
    </DutyModal>
  );
};

export default DeleteDutyModal;
