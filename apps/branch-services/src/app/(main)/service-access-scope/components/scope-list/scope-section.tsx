import { Box, Text } from '@branch-services/ui-kit';

import ScopeCard from './scope-card';
import type { ServiceAccessScope } from '../../utils/types';

type ScopeSectionProps = {
  title: string;
  scopes: ServiceAccessScope[];
  isExpired?: boolean;
  // Omitted for the expired section, whose scopes can no longer be removed
  onDelete?: (scope: ServiceAccessScope) => void;
};

// A titled group of scope cards; renders nothing when the group is empty
const ScopeSection = ({ title, scopes, isExpired = false, onDelete }: ScopeSectionProps) => {
  if (!scopes.length) return null;

  return (
    <Box flexDirection='column' gap='1.2rem'>
      <Text as='span' fontWeight={500}>
        {title}
      </Text>
      {scopes.map((scope) => (
        <ScopeCard key={scope.id} scope={scope} isExpired={isExpired} onDelete={onDelete} />
      ))}
    </Box>
  );
};

export default ScopeSection;
