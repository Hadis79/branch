import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Api } from '../services';
import { workingHoursMutationKeys, workingHoursQueryKeys } from '../utils/constants';

const useDeleteExceptionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: workingHoursMutationKeys.deleteException,
    mutationFn: Api.deleteException,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: workingHoursQueryKeys.exceptions() }),
  });
};

export default useDeleteExceptionMutation;
