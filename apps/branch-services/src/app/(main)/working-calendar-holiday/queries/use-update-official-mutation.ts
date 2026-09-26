import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Api } from '../services';
import { holidayMutationKeys, holidayQueryKeys } from '../utils/constants';

const useUpdateOfficialMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: holidayMutationKeys.updateOfficial,
    mutationFn: Api.updateOfficialHolidays,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: holidayQueryKeys.officialLists() });
      // The update dto only carries the year, not the record id, so every cached detail is invalidated
      queryClient.invalidateQueries({ queryKey: holidayQueryKeys.officialHolidaysAll() });
    },
  });
};

export default useUpdateOfficialMutation;
