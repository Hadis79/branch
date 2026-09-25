import { useTr } from '@branch-services/translation';
import { Box, Text } from '@branch-services/ui-kit';

import HolidayModal from './holiday-modal';
import { formatCount } from '../../utils/utils';

type ConfirmEditModalProps = {
  open: boolean;
  dayCount: number;
  loading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

// Last check before an official year's holidays are replaced by the uploaded file
const ConfirmEditModal = ({ open, dayCount, loading, onConfirm, onCancel }: ConfirmEditModalProps) => {
  const [t] = useTr();

  return (
    <HolidayModal
      open={open}
      title={t('confirm_edit_official_title')}
      confirmText={t('confirm')}
      confirmLoading={loading}
      onConfirm={onConfirm}
      onCancel={onCancel}
    >
      <Box flexDirection='column' gap='1.2rem'>
        <Text as='span' fontWeight={400}>
          {t('confirm_edit_official_description')}
        </Text>
        <Box justifyContent='space-between' fillChildren={false}>
          <Text as='span' fontWeight={400}>
            {t('edited_day_count')}
          </Text>
          <Text as='span'>{formatCount(dayCount)}</Text>
        </Box>
      </Box>
    </HolidayModal>
  );
};

export default ConfirmEditModal;
