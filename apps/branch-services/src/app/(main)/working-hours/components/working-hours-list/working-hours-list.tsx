import { useState } from 'react';

import { Box } from '@branch-services/ui-kit';

import DefaultCard from './default-card';
import EmptyState from './empty-state';
import ExceptionsSection from './exceptions-section';
import EditModal from '../working-hours-modal/edit-modal';
import useWorkingHoursQuery from '../../queries/use-working-hours-query';

const WorkingHoursList = () => {
  const { data, isLoading } = useWorkingHoursQuery();
  const [isEditOpen, setIsEditOpen] = useState(false);

  if (isLoading) return null;

  return (
    <Box flexDirection='column' gap='2.4rem' padding='3.2rem'>
      {!data ? (
        <EmptyState />
      ) : (
        <>
          <DefaultCard workingHours={data} onEdit={() => setIsEditOpen(true)} />
          <ExceptionsSection />
        </>
      )}
      <EditModal open={isEditOpen} workingHours={data ?? null} onClose={() => setIsEditOpen(false)} />
    </Box>
  );
};

export default WorkingHoursList;
