import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Api } from '../services';
import useOrganizationCodeStore from '../store/use-widget-store';
import { organizationCodeMutationKeys, organizationCodeQueryKeys } from '../utils/constants';
import { DeleteOrganizationCodeVariables } from '../utils/types';

const useDeleteOrganizationCodeMutation = () => {
  const queryClient = useQueryClient();
  const setPagination = useOrganizationCodeStore((state) => state.setPagination);

  return useMutation({
    mutationKey: organizationCodeMutationKeys.delete,
    mutationFn: ({ organizationCodeUUID }: DeleteOrganizationCodeVariables) =>
      Api.deleteOrganizationCode(organizationCodeUUID),
    onSuccess: async (_data, variables) => {
      if (variables.previousPage) {
        await queryClient.invalidateQueries({
          queryKey: organizationCodeQueryKeys.all,
          refetchType: 'none',
        });
        setPagination({ page: variables.previousPage });
        return;
      }

      await queryClient.invalidateQueries({ queryKey: organizationCodeQueryKeys.all });
    },
  });
};

export default useDeleteOrganizationCodeMutation;
