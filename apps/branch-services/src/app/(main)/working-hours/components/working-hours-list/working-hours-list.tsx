import { Box } from '@branch-services/ui-kit';

import DefaultCard from './default-card';
import EmptyState from './empty-state';
import ExceptionsSection from './exceptions-section';
import { DefaultCardSkeleton, ExceptionCardsSkeleton } from '../loading-skeletons/loading-skeletons';
import useWorkingHoursPage from '../../hooks/use-working-hours-page';
import useQueryErrorMessage from '../../hooks/use-query-error-message';
import useWorkingHoursQuery from '../../queries/use-working-hours-query';
import { WorkingHoursPage } from '../../utils/constants';

const WorkingHoursList = () => {
  const { data, isLoading, error } = useWorkingHoursQuery();
  const { navigateTo } = useWorkingHoursPage();
  useQueryErrorMessage(error);

  if (isLoading)
    return (
      <Box flexDirection='column' flexGrow={1} gap='2.4rem' padding='3.2rem'>
        <DefaultCardSkeleton />
        <ExceptionCardsSkeleton />
      </Box>
    );
  if (error) return null;

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
