import { useTr } from '@branch-services/translation';
import { Box, Text } from '@branch-services/ui-kit';

import ScopeModal from './scope-modal';
import type { ServiceAccessScope } from '../../utils/types';

type DeleteScopeModalProps = {
  scope: ServiceAccessScope | null;
  loading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

const DeleteScopeModal = ({ scope, loading, onConfirm, onCancel }: DeleteScopeModalProps) => {
  const [t] = useTr();

  return (
    <ScopeModal
      open={Boolean(scope)}
      title={t('delete_scope_title', { title: scope?.title ?? '' })}
      confirmText={t('delete')}
      confirmLoading={loading}
      danger
      onConfirm={onConfirm}
      onCancel={onCancel}
    >
      <Box flexDirection='column' gap='0.4rem'>
        <Text as='span' fontWeight={400}>
          {t('delete_scope_question')}
        </Text>
        <Text as='span' fontWeight={400}>
          {t('delete_scope_description')}
        </Text>
      </Box>
    </ScopeModal>
  );
};

export default DeleteScopeModal;
