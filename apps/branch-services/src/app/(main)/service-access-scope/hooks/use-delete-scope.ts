import { useState } from 'react';

import { ApiUtil } from '@branch-services/utils';

import useDeleteScopeMutation from '../queries/use-delete-scope-mutation';
import useServiceAccessScopeStore from '../store/use-widget-store';
import type { ServiceAccessScope } from '../utils/types';

// The scope picked for deletion and the confirm / cancel handlers of its modal
const useDeleteScope = () => {
  const [selectedScope, setSelectedScope] = useState<ServiceAccessScope | null>(null);
  const deleteMutation = useDeleteScopeMutation();
  const setMessage = useServiceAccessScopeStore((state) => state.setMessage);

  const cancelDelete = () => {
    if (deleteMutation.isPending) return;
    deleteMutation.reset();
    setSelectedScope(null);
  };

  const confirmDelete = () => {
    if (!selectedScope || deleteMutation.isPending) return;

    deleteMutation.mutate(selectedScope.id, {
      onSuccess: () => setMessage({ txt: 'delete_scope_success', type: 'success', shouldTranslate: true }),
      onError: (error) => setMessage(ApiUtil.getErrorMessage(error)),
      onSettled: () => setSelectedScope(null),
    });
  };

  return {
    selectedScope,
    isDeleting: deleteMutation.isPending,
    // A state setter, so it stays the same between renders and the memoized cards don't re-render
    requestDelete: setSelectedScope,
    confirmDelete,
    cancelDelete,
  };
};

export default useDeleteScope;
