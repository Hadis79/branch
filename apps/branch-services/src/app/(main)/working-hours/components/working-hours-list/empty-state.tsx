import { useTr } from '@branch-services/translation';
import { Box, Button, EmptyData } from '@branch-services/ui-kit';

import useWorkingHoursPage from '../../hooks/use-working-hours-page';
import { WorkingHoursPage } from '../../utils/constants';
import CalendarSvg from '../../assets/calendar';

// Shown before the bank's default working hours have been defined
const EmptyState = () => {
  const [t] = useTr();
  const { navigateTo } = useWorkingHoursPage();

  return (
    <Box
      flexDirection='column'
      width={'50%'}
      alignItems='center'
      justifyContent='center'
      gap='2.4rem'
      margin={'auto auto'}
      padding='3.2rem'
    >
      <EmptyData image={<CalendarSvg />} description={t('empty_guide_description')} />
      <Button style={{ width: 'fit-content' }} type='primary' onClick={() => navigateTo(WorkingHoursPage.CREATE)}>
        {t('define_default_hours')}
        <i className='ri-add-line' />
      </Button>
    </Box>
  );
};

export default EmptyState;
