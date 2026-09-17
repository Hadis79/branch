import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Api } from '../services';
import { serviceMutationKeys, serviceQueryKeys } from '../utils/constants';

const useUpdateServiceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: serviceMutationKeys.update,
    mutationFn: Api.updateService,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: serviceQueryKeys.lists() }),
  });
};

export default useUpdateServiceMutation;
