import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Api } from '../services';
import { groupQueryKeys, groupsMutationKeys } from '../utils/constants';

const useUpdateGroupMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: groupsMutationKeys.update,
    mutationFn: Api.updateGroup,
    onSuccess: (_data, { id }) =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: groupQueryKeys.lists() }),
        queryClient.invalidateQueries({ queryKey: groupQueryKeys.groupUnits(id) }),
      ]),
  });
};

export default useUpdateGroupMutation;
