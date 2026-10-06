import { Box } from '@branch-services/ui-kit';

import DefaultCard from './default-card';
import EmptyState from './empty-state';
import ExceptionsSection from './exceptions-section';
import useWorkingHoursPage from '../../hooks/use-working-hours-page';
import useWorkingHoursQuery from '../../queries/use-working-hours-query';
import { WorkingHoursPage } from '../../utils/constants';

const WorkingHoursList = () => {
  const { data, isLoading } = useWorkingHoursQuery();
  const { navigateTo } = useWorkingHoursPage();

  if (isLoading) return null;

  return (
    <Box flexDirection='column' flexGrow={1} gap='2.4rem' padding='3.2rem'>
      {!data ? (
        <EmptyState />
      ) : (
        <>
          <DefaultCard workingHours={data} onEdit={() => navigateTo(WorkingHoursPage.EDIT)} />
          <ExceptionsSection />
        </>
      )}
    </Box>
  );
};

export default WorkingHoursList;
