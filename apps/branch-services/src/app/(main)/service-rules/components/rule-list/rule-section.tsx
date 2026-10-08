import { Box, Text } from '@branch-services/ui-kit';

import RuleCard from './rule-card';
import type { ServiceRule } from '../../utils/types';

type RuleSectionProps = {
  title: string;
  rules: ServiceRule[];
  isExpired?: boolean;
  // Omitted for the expired section, whose rules can no longer be removed
  onDelete?: (rule: ServiceRule) => void;
};

// A titled group of rule cards; renders nothing when the group is empty
const RuleSection = ({ title, rules, isExpired = false, onDelete }: RuleSectionProps) => {
  if (!rules.length) return null;

  return (
    <Box flexDirection='column' gap='1.2rem'>
      <Text as='span' fontWeight={500}>
        {title}
      </Text>
      {rules.map((rule) => (
        <RuleCard
          key={rule.id}
          rule={rule}
          isExpired={isExpired}
          onDelete={onDelete ? () => onDelete(rule) : undefined}
        />
      ))}
    </Box>
  );
};

export default RuleSection;
