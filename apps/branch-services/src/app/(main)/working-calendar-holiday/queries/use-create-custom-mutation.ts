import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Api } from '../services';
import { holidayMutationKeys, holidayQueryKeys } from '../utils/constants';

const useCreateCustomMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: holidayMutationKeys.createCustom,
    mutationFn: Api.createCustomHolidays,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: holidayQueryKeys.customLists() }),
  });
};

export default useCreateCustomMutation;
