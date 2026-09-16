import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Api } from '../services';
import { groupQueryKeys, groupsMutationKeys } from '../utils/constants';

const useDeleteGroupMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: groupsMutationKeys.delete,
    mutationFn: ({ id }: { id: string }) => Api.removeGroups(id),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: groupQueryKeys.all,
      }),
  });
};

export default useDeleteGroupMutation;
