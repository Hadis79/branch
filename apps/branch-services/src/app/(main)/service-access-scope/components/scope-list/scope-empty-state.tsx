import { Box, EmptyData } from '@branch-services/ui-kit';

import NewScopeButton from '../header-action/new-scope-button';

// Nothing defined yet; the header's create button is hidden meanwhile, so it moves here
const ScopeEmptyState = () => (
  <Box flexDirection='column' height='100%' justifyContent='center' alignItems='center' gap='2.4rem' padding='3.2rem'>
    <EmptyData />
    <NewScopeButton />
  </Box>
);

export default ScopeEmptyState;
