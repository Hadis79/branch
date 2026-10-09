import { useMemo } from 'react';

import { useTr } from '@branch-services/translation';
import { Box } from '@branch-services/ui-kit';

import ScopeSection from './scope-section';
import ScopeEmptyState from './scope-empty-state';
import ErrorState from '../error-state/error-state';
import { ScopeListSkeleton } from '../loading-skeletons/loading-skeletons';
import DeleteScopeModal from '../scope-modal/delete-scope-modal';
import useDeleteScope from '../../hooks/use-delete-scope';
import useQueryErrorMessage from '../../hooks/use-query-error-message';
import useScopesQuery from '../../queries/use-scopes-query';
import { splitByExpiry } from '../../utils/utils';

const ScopeList = () => {
  const [t] = useTr();
  const { data: scopes, isLoading, error, refetch, isRefetching } = useScopesQuery();
  const { selectedScope, isDeleting, requestDelete, confirmDelete, cancelDelete } = useDeleteScope();
  const { active, expired } = useMemo(() => splitByExpiry(scopes ?? []), [scopes]);
  useQueryErrorMessage(error);

  if (isLoading) return <ScopeListSkeleton />;

  if (error) return <ErrorState onRetry={() => refetch()} retrying={isRefetching} />;

  if (!scopes?.length) return <ScopeEmptyState />;

  return (
    <Box flexDirection='column' flexGrow={1} gap='2.4rem' padding='3.2rem'>
      <ScopeSection title={t('scopes_section_title')} scopes={active} onDelete={requestDelete} />
      <ScopeSection title={t('expired_scopes_section_title')} scopes={expired} isExpired />
      <DeleteScopeModal scope={selectedScope} loading={isDeleting} onConfirm={confirmDelete} onCancel={cancelDelete} />
    </Box>
  );
};

export default ScopeList;
