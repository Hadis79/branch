import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Api } from '../services';
import { toWorkingHours, toWorkingHoursRequest } from '../services/mappers';
import { workingHoursMutationKeys, workingHoursQueryKeys } from '../utils/constants';
import type { WorkingHoursDto } from '../utils/types';

const useUpdateWorkingHoursMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: workingHoursMutationKeys.update,
    mutationFn: async (dto: WorkingHoursDto) =>
      toWorkingHours(await Api.updateWorkingHours(toWorkingHoursRequest(dto))),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: workingHoursQueryKeys.default() }),
  });
};

export default useUpdateWorkingHoursMutation;
