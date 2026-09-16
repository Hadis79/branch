import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Api } from '../services';
import { groupQueryKeys, groupsMutationKeys } from '../utils/constants';

const useDeleteGroupMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: groupsMutationKeys.delete,
    mutationFn: ({ id }: { id: string }) => Api.removeGroups(id),
    onSuccess: (_data, { id }) => {
      queryClient.removeQueries({ queryKey: groupQueryKeys.groupUnits(id) });
      return queryClient.invalidateQueries({ queryKey: groupQueryKeys.lists() });
    },
  });
};

export default useDeleteGroupMutation;
