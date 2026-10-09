import { useState } from 'react';

import { ApiUtil } from '@branch-services/utils';

import useDeleteDutyMutation from '../queries/use-delete-duty-mutation';
import useDutyStore from '../store/use-widget-store';
import type { Duty } from '../utils/types';

// The duty picked for deletion and the confirm / cancel handlers of its modal
const useDeleteDuty = () => {
  const [selectedDuty, setSelectedDuty] = useState<Duty | null>(null);
  const deleteMutation = useDeleteDutyMutation();
  const setMessage = useDutyStore((state) => state.setMessage);

  const cancelDelete = () => {
    if (deleteMutation.isPending) return;
    deleteMutation.reset();
    setSelectedDuty(null);
  };

  const confirmDelete = () => {
    if (!selectedDuty || deleteMutation.isPending) return;

    deleteMutation.mutate(selectedDuty.id, {
      onSuccess: () => setMessage({ txt: 'delete_duty_success', type: 'success', shouldTranslate: true }),
      onError: (error) => setMessage(ApiUtil.getErrorMessage(error)),
      onSettled: () => setSelectedDuty(null),
    });
  };

  return {
    selectedDuty,
    isDeleting: deleteMutation.isPending,
    // A state setter, so it stays the same between renders and the memoized cards don't re-render
    requestDelete: setSelectedDuty,
    confirmDelete,
    cancelDelete,
  };
};

export default useDeleteDuty;
