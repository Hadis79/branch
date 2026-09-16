import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Api } from '../services';
import { groupQueryKeys, groupsMutationKeys } from '../utils/constants';

const useCreateGroupsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: groupsMutationKeys.create,
    mutationFn: Api.createGroups,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: groupQueryKeys.all,
      }),
  });
};

export default useCreateGroupsMutation;
