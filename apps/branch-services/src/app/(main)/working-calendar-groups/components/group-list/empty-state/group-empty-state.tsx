import { useTr } from '@branch-services/translation';
import { Box, Button, EmptyData } from '@branch-services/ui-kit';
import useWorkingCalendarGroupPage from '../../../hooks/use-working-calendar-group-page';
import { WorkingCalendarGroupPage } from '../../../utils/constants';

const GroupEmptyState = () => {
  const [t] = useTr();
  const { navigateTo } = useWorkingCalendarGroupPage();

  const handleClick = () => navigateTo(WorkingCalendarGroupPage.ADD);

  return (
    <Box
      flexDirection='column'
      height={'100%'}
      justifyContent='center'
      alignItems='center'
      gap='2.4rem'
      padding='3.2rem'
    >
      <EmptyData />
      <Button style={{ width: 'fit-content' }} onClick={handleClick} type='primary'>
        {t('add_group')}
        <i className='ri-add-line' />
      </Button>
    </Box>
  );
};

export default GroupEmptyState;
