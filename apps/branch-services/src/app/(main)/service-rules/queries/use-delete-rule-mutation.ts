import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Api } from '../services';
import { serviceRulesMutationKeys, serviceRulesQueryKeys } from '../utils/constants';

const useDeleteRuleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: serviceRulesMutationKeys.delete,
    mutationFn: Api.deleteRule,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: serviceRulesQueryKeys.rules() }),
  });
};

export default useDeleteRuleMutation;
