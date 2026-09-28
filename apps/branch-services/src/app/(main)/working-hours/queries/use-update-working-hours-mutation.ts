import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Api } from '../services';
import { workingHoursMutationKeys, workingHoursQueryKeys } from '../utils/constants';

const useUpdateWorkingHoursMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: workingHoursMutationKeys.update,
    mutationFn: Api.updateWorkingHours,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: workingHoursQueryKeys.default() }),
  });
};

export default useUpdateWorkingHoursMutation;
