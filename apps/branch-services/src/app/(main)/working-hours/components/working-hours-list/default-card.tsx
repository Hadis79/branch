import { useAppTheme } from '@branch-services/hooks';
import { useTr } from '@branch-services/translation';
import { Box, Button, Text } from '@branch-services/ui-kit';

import DayHoursChips from '../day-hours/day-hours-chips';
import type { WorkingHours } from '../../utils/types';

type DefaultCardProps = {
  workingHours: WorkingHours;
  onEdit: () => void;
};

// The bank's default hours for each weekday, applied to every branch unless an exception overrides them
const DefaultCard = ({ workingHours, onEdit }: DefaultCardProps) => {
  const [t] = useTr();
  const theme = useAppTheme();

  return (
    <Box
      backgroundColor={theme.backgroundLight}
      padding={'1.6rem 2.4rem'}
      borderRadius={'0.8rem'}
      flexDirection='column'
      gap='1.6rem'
    >
      <Box justifyContent='space-between' alignItems='center' fillChildren={false}>
        <Text color={theme.textPrimary} as='span' fontWeight={500}>
          {t('default_title_value')}
        </Text>
        <Button style={{ width: 'fit-content' }} type='link' onClick={onEdit}>
          {t('edit')}
          <i className='ri-edit-line'></i>
        </Button>
      </Box>
      <DayHoursChips days={workingHours.days} />
    </Box>
  );
};

export default DefaultCard;
