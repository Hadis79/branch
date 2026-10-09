import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Api } from '../services';
import { dutyMutationKeys, dutyQueryKeys } from '../utils/constants';

const useDeleteDutyMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: dutyMutationKeys.delete,
    mutationFn: Api.deleteDuty,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: dutyQueryKeys.duties() }),
  });
};

export default useDeleteDutyMutation;
