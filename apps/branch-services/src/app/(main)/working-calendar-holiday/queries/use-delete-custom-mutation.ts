import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Api } from '../services';
import { holidayMutationKeys, holidayQueryKeys } from '../utils/constants';

const useDeleteCustomMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: holidayMutationKeys.deleteCustom,
    mutationFn: Api.deleteCustomHoliday,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: holidayQueryKeys.customLists() }),
  });
};

export default useDeleteCustomMutation;
