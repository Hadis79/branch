import { useTr } from '@branch-services/translation';
import { Box } from '@branch-services/ui-kit';

import RuleSection from './rule-section';
import RuleEmptyState from './rule-empty-state';
import DeleteRuleModal from '../rule-modal/delete-rule-modal';
import useDeleteRule from '../../hooks/use-delete-rule';
import useRulesQuery from '../../queries/use-rules-query';
import { isExpiredRule } from '../../utils/utils';
import type { ServiceRule } from '../../utils/types';

// Active rules first, then the expired ones (read-only)
const splitByExpiry = (rules: ServiceRule[]) => {
  const active: ServiceRule[] = [];
  const expired: ServiceRule[] = [];
  rules.forEach((rule) => (isExpiredRule(rule) ? expired : active).push(rule));
  return { active, expired };
};

const RuleList = () => {
  const [t] = useTr();
  const { data: rules, isLoading } = useRulesQuery();
  const { selectedRule, isDeleting, requestDelete, confirmDelete, cancelDelete } = useDeleteRule();

  if (isLoading) return null;

  if (!rules?.length) return <RuleEmptyState />;

  const { active, expired } = splitByExpiry(rules);

  return (
    <Box flexDirection='column' flexGrow={1} gap='2.4rem' padding='3.2rem'>
      <RuleSection title={t('rules_section_title')} rules={active} onDelete={requestDelete} />
      <RuleSection title={t('expired_rules_section_title')} rules={expired} isExpired />
      <DeleteRuleModal rule={selectedRule} loading={isDeleting} onConfirm={confirmDelete} onCancel={cancelDelete} />
    </Box>
  );
};

export default RuleList;
