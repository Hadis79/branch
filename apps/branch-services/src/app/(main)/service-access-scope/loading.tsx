'use client';

import { Box } from '@branch-services/ui-kit';

import { PageSkeleton } from './components/loading-skeletons/loading-skeletons';

const Loading = () => (
  <Box padding='3.2rem'>
    <PageSkeleton />
  </Box>
);

export default Loading;
