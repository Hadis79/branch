import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Api } from '../services';
import { holidayMutationKeys, holidayQueryKeys } from '../utils/constants';

const useCreateOfficialMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: holidayMutationKeys.createOfficial,
    mutationFn: Api.createOfficialHolidays,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: holidayQueryKeys.officialLists() }),
  });
};

export default useCreateOfficialMutation;
