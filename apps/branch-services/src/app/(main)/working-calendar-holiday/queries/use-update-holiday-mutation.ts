import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Api } from '../services';
import { holidayMutationKeys, holidayQueryKeys } from '../utils/constants';

const useUpdateHolidayMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: holidayMutationKeys.update,
    mutationFn: Api.updateHoliday,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: holidayQueryKeys.lists() }),
  });
};

export default useUpdateHolidayMutation;
