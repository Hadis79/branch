import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Api } from '../services';
import { toWorkingHoursExceptionRequest } from '../services/mappers';
import { workingHoursMutationKeys, workingHoursQueryKeys } from '../utils/constants';
import type { WorkingHoursExceptionDto } from '../utils/types';

const useCreateExceptionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: workingHoursMutationKeys.createException,
    mutationFn: (dto: WorkingHoursExceptionDto) => Api.createException(toWorkingHoursExceptionRequest(dto)),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: workingHoursQueryKeys.exceptions() }),
  });
};

export default useCreateExceptionMutation;
