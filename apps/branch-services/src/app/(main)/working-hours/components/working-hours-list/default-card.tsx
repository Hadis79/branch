import { useAppTheme } from '@branch-services/hooks';
import { useTr } from '@branch-services/translation';
import { Box, Button, Text } from '@branch-services/ui-kit';

import type { WorkingHours } from '../../utils/types';
import { formatHour } from '../../utils/utils';

type DefaultCardProps = {
  workingHours: WorkingHours;
  onEdit: () => void;
};

// The bank's default working hours, applied to every branch unless an exception overrides them
const DefaultCard = ({ workingHours, onEdit }: DefaultCardProps) => {
  const [t] = useTr();
  const theme = useAppTheme();

  return (
    <Box border={`0.1rem solid ${theme.border}`} padding={'1.6rem 2.4rem'} borderRadius={'0.8rem'}>
      <Box flexDirection='column' width={'100%'} gap='0.8rem'>
        <Text color={theme.textPrimary} as='span' fontWeight={500}>
          {workingHours.title}
        </Text>
        <Box alignItems='center' gap='0.8rem' fillChildren={false}>
          <i className='ri-time-line' />
          <Text as='span' color={theme.textSecondary}>
            {t('hours_range', { from: formatHour(workingHours.from), to: formatHour(workingHours.to) })}
          </Text>
        </Box>
      </Box>
      <Box justifyContent='end' width={'100%'} alignItems='center'>
        <Button style={{ width: 'fit-content' }} type='link' onClick={onEdit}>
          {t('edit')}
          <i className='ri-edit-line'></i>
        </Button>
      </Box>
    </Box>
  );
};

export default DefaultCard;
