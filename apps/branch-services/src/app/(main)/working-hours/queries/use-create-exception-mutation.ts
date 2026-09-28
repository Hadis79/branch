import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Api } from '../services';
import { toWorkingHoursException, toWorkingHoursExceptionRequest } from '../services/mappers';
import { workingHoursMutationKeys, workingHoursQueryKeys } from '../utils/constants';
import type { WorkingHoursExceptionDto } from '../utils/types';

const useCreateExceptionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: workingHoursMutationKeys.createException,
    mutationFn: async (dto: WorkingHoursExceptionDto) =>
      toWorkingHoursException(await Api.createException(toWorkingHoursExceptionRequest(dto))),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: workingHoursQueryKeys.exceptions() }),
  });
};

export default useCreateExceptionMutation;
