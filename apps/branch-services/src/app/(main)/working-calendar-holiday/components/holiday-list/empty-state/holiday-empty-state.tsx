import { Box, EmptyData } from '@branch-services/ui-kit';

import NewHolidayButton from '../../new-holiday-button/new-holiday-button';

const HolidayEmptyState = () => (
  <Box flexDirection='column' height='100%' justifyContent='center' alignItems='center' gap='2.4rem' padding='3.2rem'>
    <EmptyData />
    <NewHolidayButton />
  </Box>
);

export default HolidayEmptyState;
