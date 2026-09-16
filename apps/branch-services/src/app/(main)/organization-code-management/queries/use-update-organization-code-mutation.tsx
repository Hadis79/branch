import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Api } from '../services';
import { organizationCodeMutationKeys, organizationCodeQueryKeys } from '../utils/constants';
import { UpdateOrganizationCodeVariables } from '../utils/types';

const useUpdateOrganizationCodeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: organizationCodeMutationKeys.update,
    mutationFn: ({ organizationCodeUUID, values }: UpdateOrganizationCodeVariables) =>
      Api.updateOrganizationCode(organizationCodeUUID, values),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: organizationCodeQueryKeys.all }),
  });
};

export default useUpdateOrganizationCodeMutation;
