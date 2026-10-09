import { Box, Text } from '@branch-services/ui-kit';

import DutyCard from './duty-card';
import type { Duty } from '../../utils/types';

type DutySectionProps = {
  title: string;
  duties: Duty[];
  isExpired?: boolean;
  // Omitted for the expired section, whose duties can no longer be removed
  onDelete?: (duty: Duty) => void;
};

// A titled group of duty cards; renders nothing when the group is empty
const DutySection = ({ title, duties, isExpired = false, onDelete }: DutySectionProps) => {
  if (!duties.length) return null;

  return (
    <Box flexDirection='column' gap='1.2rem'>
      <Text as='span' fontWeight={500}>
        {title}
      </Text>
      {duties.map((duty) => (
        <DutyCard key={duty.id} duty={duty} isExpired={isExpired} onDelete={onDelete} />
      ))}
    </Box>
  );
};

export default DutySection;
