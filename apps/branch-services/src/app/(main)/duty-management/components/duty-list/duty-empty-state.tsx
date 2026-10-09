import { Box, EmptyData } from '@branch-services/ui-kit';

import NewDutyButton from '../header-action/new-duty-button';

// Nothing defined yet; the header's create button is hidden meanwhile, so it moves here
const DutyEmptyState = () => (
  <Box flexDirection='column' height='100%' justifyContent='center' alignItems='center' gap='2.4rem' padding='3.2rem'>
    <EmptyData />
    <NewDutyButton />
  </Box>
);

export default DutyEmptyState;
