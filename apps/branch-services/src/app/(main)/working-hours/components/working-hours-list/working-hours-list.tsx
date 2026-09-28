import { useState } from 'react';

import { Box } from '@branch-services/ui-kit';

import DefaultCard from './default-card';
import EmptyState from './empty-state';
import WorkingHoursMessage from '../working-hours-message/working-hours-message';
import EditModal from '../working-hours-modal/edit-modal';
import useWorkingHoursQuery from '../../queries/use-working-hours-query';
import useWorkingHoursStore from '../../store/use-widget-store';
import { isEmptyObjectValues } from '@branch-services/utils';

const WorkingHoursList = () => {
  const { data, isLoading } = useWorkingHoursQuery();
  const message = useWorkingHoursStore((state) => state.message);
  const setMessage = useWorkingHoursStore((state) => state.setMessage);
  const [isEditOpen, setIsEditOpen] = useState(false);

  if (isLoading) return null;

  return (
    <Box flexDirection='column' gap='2.4rem' padding='3.2rem'>
      {message && <WorkingHoursMessage message={message} closable onClose={() => setMessage(null)} />}
      {data && isEmptyObjectValues(data!) ? (
        <EmptyState />
      ) : (
        <DefaultCard workingHours={data!} onEdit={() => setIsEditOpen(true)} />
      )}
      <EditModal open={isEditOpen} workingHours={data ?? null} onClose={() => setIsEditOpen(false)} />
    </Box>
  );
};

export default WorkingHoursList;
