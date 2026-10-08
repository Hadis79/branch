import { useQuery } from '@tanstack/react-query';

import { Api } from '../services';
import { toWorkingHours } from '../services/mappers';
import { workingHoursQueryKeys } from '../utils/constants';
import { isWorkingDay } from '../utils/utils';

// null while the bank's default working hours have not been defined yet (the list's empty state):
// either the service 404s, or it responds with an otherwise-empty record.
const useWorkingHoursQuery = (enabled = true) =>
  useQuery({
    queryKey: workingHoursQueryKeys.default(),
    queryFn: async () => {
      const response = await Api.getWorkingHours();
      if (!response) return null;

      const workingHours = toWorkingHours(response);
      return workingHours.title || workingHours.days.some(isWorkingDay) ? workingHours : null;
    },
    enabled,
  });

export default useWorkingHoursQuery;
