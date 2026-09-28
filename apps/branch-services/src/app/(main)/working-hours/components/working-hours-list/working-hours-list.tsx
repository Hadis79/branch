import { useState } from 'react';

import { useTr } from '@branch-services/translation';
import { Box, Button } from '@branch-services/ui-kit';

import DefaultCard from './default-card';
import EmptyState from './empty-state';
import WorkingHoursMessage from '../working-hours-message/working-hours-message';
import AddExceptionModal from '../working-hours-modal/add-exception-modal';
import EditModal from '../working-hours-modal/edit-modal';
import useWorkingHoursQuery from '../../queries/use-working-hours-query';
import useWorkingHoursStore from '../../store/use-widget-store';

const WorkingHoursList = () => {
  const [t] = useTr();
  const { data, isLoading } = useWorkingHoursQuery();
  const message = useWorkingHoursStore((state) => state.message);
  const setMessage = useWorkingHoursStore((state) => state.setMessage);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isExceptionOpen, setIsExceptionOpen] = useState(false);

  if (isLoading) return null;

  return (
    <Box flexDirection='column' gap='2.4rem' padding='3.2rem'>
      {message && <WorkingHoursMessage message={message} closable onClose={() => setMessage(null)} />}
      {!data ? (
        <EmptyState />
      ) : (
        <>
          <Box justifyContent='flex-end' fillChildren={false}>
            <Button type='primary' onClick={() => setIsExceptionOpen(true)}>
              {t('add_exception')}
              <i className='ri-add-line' />
            </Button>
          </Box>
          <DefaultCard workingHours={data} onEdit={() => setIsEditOpen(true)} />
        </>
      )}
      <EditModal open={isEditOpen} workingHours={data ?? null} onClose={() => setIsEditOpen(false)} />
      <AddExceptionModal open={isExceptionOpen} onClose={() => setIsExceptionOpen(false)} />
    </Box>
  );
};

export default WorkingHoursList;
