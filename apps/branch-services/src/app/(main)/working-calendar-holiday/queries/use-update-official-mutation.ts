import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Api } from '../services';
import { holidayMutationKeys, holidayQueryKeys } from '../utils/constants';

const useUpdateOfficialMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: holidayMutationKeys.updateOfficial,
    mutationFn: Api.updateOfficialHolidays,
    onSuccess: (_data, { year }) => {
      queryClient.invalidateQueries({ queryKey: holidayQueryKeys.officialLists() });
      queryClient.invalidateQueries({ queryKey: holidayQueryKeys.officialYear(year) });
    },
  });
};

export default useUpdateOfficialMutation;
