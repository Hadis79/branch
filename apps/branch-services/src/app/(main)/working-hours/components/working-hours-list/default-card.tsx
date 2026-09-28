import { useAppTheme } from '@branch-services/hooks';
import { useTr } from '@branch-services/translation';
import { Box, Button, Text } from '@branch-services/ui-kit';

import * as S from './default-card.style';
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
    <S.Card>
      <Box flexDirection='column' gap='0.8rem'>
        <Text as='span' fontWeight={500}>
          {t('default_title_value')}
        </Text>
        <Box alignItems='center' gap='0.8rem' fillChildren={false}>
          <i className='ri-time-line' />
          <Text as='span' color={theme.textSecondary}>
            {t('hours_range', { from: formatHour(workingHours.from), to: formatHour(workingHours.to) })}
          </Text>
        </Box>
      </Box>
      <Button type='link' icon={<i className='ri-pencil-line' />} onClick={onEdit}>
        {t('edit')}
      </Button>
    </S.Card>
  );
};

export default DefaultCard;
