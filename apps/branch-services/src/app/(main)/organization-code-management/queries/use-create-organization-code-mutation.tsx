import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Api } from '../services';
import { organizationCodeMutationKeys, organizationCodeQueryKeys } from '../utils/constants';

const useCreateOrganizationCodeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: organizationCodeMutationKeys.create,
    mutationFn: Api.createOrganizationCode,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: organizationCodeQueryKeys.all,
        refetchType: 'none',
      }),
  });
};

export default useCreateOrganizationCodeMutation;
