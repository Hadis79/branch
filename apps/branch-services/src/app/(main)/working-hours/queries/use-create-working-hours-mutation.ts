import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Api } from '../services';
import { workingHoursMutationKeys, workingHoursQueryKeys } from '../utils/constants';

const useCreateWorkingHoursMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: workingHoursMutationKeys.create,
    mutationFn: Api.createWorkingHours,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: workingHoursQueryKeys.default() }),
  });
};

export default useCreateWorkingHoursMutation;
