import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Api } from '../services';
import { serviceAccessScopeMutationKeys, serviceAccessScopeQueryKeys } from '../utils/constants';

const useDeleteScopeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: serviceAccessScopeMutationKeys.delete,
    mutationFn: Api.deleteScope,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: serviceAccessScopeQueryKeys.scopes() }),
  });
};

export default useDeleteScopeMutation;
