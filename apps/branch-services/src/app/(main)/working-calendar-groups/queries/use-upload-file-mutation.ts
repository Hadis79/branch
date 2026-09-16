import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Api } from '../services';
import { groupQueryKeys, groupsMutationKeys } from '../utils/constants';

const useUploadFileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: groupsMutationKeys.upload,
    mutationFn: Api.uploadFile,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: groupQueryKeys.all,
        refetchType: 'none',
      }),
  });
};

export default useUploadFileMutation;
