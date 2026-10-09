import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Api } from '../services';
import { toServiceAccessScopeRequest } from '../services/mappers';
import { serviceAccessScopeMutationKeys, serviceAccessScopeQueryKeys } from '../utils/constants';
import type { ServiceAccessScopeDto } from '../utils/types';

const useCreateScopeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: serviceAccessScopeMutationKeys.create,
    mutationFn: (dto: ServiceAccessScopeDto) => Api.createScope(toServiceAccessScopeRequest(dto)),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: serviceAccessScopeQueryKeys.scopes() }),
  });
};

export default useCreateScopeMutation;
