import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Api } from '../services';
import { holidayMutationKeys, holidayQueryKeys } from '../utils/constants';

const useDeleteHolidayMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: holidayMutationKeys.delete,
    mutationFn: Api.deleteHoliday,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: holidayQueryKeys.lists() }),
  });
};

export default useDeleteHolidayMutation;
