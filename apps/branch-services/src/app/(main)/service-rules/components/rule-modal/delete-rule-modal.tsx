import { useTr } from '@branch-services/translation';
import { Text } from '@branch-services/ui-kit';

import RuleModal from './rule-modal';
import type { ServiceRule } from '../../utils/types';

type DeleteRuleModalProps = {
  rule: ServiceRule | null;
  loading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

const DeleteRuleModal = ({ rule, loading, onConfirm, onCancel }: DeleteRuleModalProps) => {
  const [t] = useTr();

  return (
    <RuleModal
      open={Boolean(rule)}
      title={t('delete_rule_title')}
      confirmText={t('delete')}
      confirmLoading={loading}
      danger
      onConfirm={onConfirm}
      onCancel={onCancel}
    >
      <Text as='span' fontWeight={400}>
        {t('delete_rule_confirmation', { title: rule?.title ?? '' })}
      </Text>
    </RuleModal>
  );
};

export default DeleteRuleModal;
