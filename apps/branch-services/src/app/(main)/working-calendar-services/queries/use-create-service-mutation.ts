import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Api } from '../services';
import { serviceMutationKeys, serviceQueryKeys } from '../utils/constants';

const useCreateServiceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: serviceMutationKeys.create,
    mutationFn: Api.createService,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: serviceQueryKeys.lists() }),
  });
};

export default useCreateServiceMutation;
