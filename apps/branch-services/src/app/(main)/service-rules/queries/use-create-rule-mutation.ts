import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Api } from '../services';
import { toServiceRuleRequest } from '../services/mappers';
import { serviceRulesMutationKeys, serviceRulesQueryKeys } from '../utils/constants';
import type { ServiceRuleDto } from '../utils/types';

const useCreateRuleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: serviceRulesMutationKeys.create,
    mutationFn: (dto: ServiceRuleDto) => Api.createRule(toServiceRuleRequest(dto)),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: serviceRulesQueryKeys.rules() }),
  });
};

export default useCreateRuleMutation;
