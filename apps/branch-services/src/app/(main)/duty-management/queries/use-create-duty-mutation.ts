import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Api } from '../services';
import { toDutyRequest } from '../services/mappers';
import { dutyMutationKeys, dutyQueryKeys } from '../utils/constants';
import type { DutyDto } from '../utils/types';

const useCreateDutyMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: dutyMutationKeys.create,
    mutationFn: (dto: DutyDto) => Api.createDuty(toDutyRequest(dto)),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: dutyQueryKeys.duties() }),
  });
};

export default useCreateDutyMutation;
