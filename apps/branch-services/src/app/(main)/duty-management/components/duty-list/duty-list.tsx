import { useMemo } from 'react';

import { useTr } from '@branch-services/translation';
import { Box } from '@branch-services/ui-kit';

import DutySection from './duty-section';
import DutyEmptyState from './duty-empty-state';
import ErrorState from '../error-state/error-state';
import { DutyListSkeleton } from '../loading-skeletons/loading-skeletons';
import DeleteDutyModal from '../duty-modal/delete-duty-modal';
import useDeleteDuty from '../../hooks/use-delete-duty';
import useQueryErrorMessage from '../../hooks/use-query-error-message';
import useDutiesQuery from '../../queries/use-duties-query';
import { splitByExpiry } from '../../utils/utils';

const DutyList = () => {
  const [t] = useTr();
  const { data: duties, isLoading, error, refetch, isRefetching } = useDutiesQuery();
  const { selectedDuty, isDeleting, requestDelete, confirmDelete, cancelDelete } = useDeleteDuty();
  const { active, expired } = useMemo(() => splitByExpiry(duties ?? []), [duties]);
  useQueryErrorMessage(error);

  if (isLoading) return <DutyListSkeleton />;

  if (error) return <ErrorState onRetry={() => refetch()} retrying={isRefetching} />;

  if (!duties?.length) return <DutyEmptyState />;

  return (
    <Box flexDirection='column' flexGrow={1} gap='2.4rem' padding='3.2rem'>
      <DutySection title={t('duties_section_title')} duties={active} onDelete={requestDelete} />
      <DutySection title={t('expired_duties_section_title')} duties={expired} isExpired />
      <DeleteDutyModal duty={selectedDuty} loading={isDeleting} onConfirm={confirmDelete} onCancel={cancelDelete} />
    </Box>
  );
};

export default DutyList;
