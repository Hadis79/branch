import { useState } from 'react';

import { ApiUtil } from '@branch-services/utils';

import useDeleteRuleMutation from '../queries/use-delete-rule-mutation';
import useServiceRulesStore from '../store/use-widget-store';
import type { ServiceRule } from '../utils/types';

// The rule picked for deletion and the confirm / cancel handlers of its modal
const useDeleteRule = () => {
  const [selectedRule, setSelectedRule] = useState<ServiceRule | null>(null);
  const deleteMutation = useDeleteRuleMutation();
  const setMessage = useServiceRulesStore((state) => state.setMessage);

  const cancelDelete = () => {
    if (deleteMutation.isPending) return;
    deleteMutation.reset();
    setSelectedRule(null);
  };

  const confirmDelete = () => {
    if (!selectedRule || deleteMutation.isPending) return;

    deleteMutation.mutate(selectedRule.id, {
      onSuccess: () => setMessage({ txt: 'delete_rule_success', type: 'success', shouldTranslate: true }),
      onError: (error) => setMessage(ApiUtil.getErrorMessage(error)),
      onSettled: () => setSelectedRule(null),
    });
  };

  return {
    selectedRule,
    isDeleting: deleteMutation.isPending,
    requestDelete: setSelectedRule,
    confirmDelete,
    cancelDelete,
  };
};

export default useDeleteRule;
