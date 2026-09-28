import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import { isEmptyObjectValues } from '@branch-services/utils';

import { Api } from '../services';
import { toWorkingHours } from '../services/mappers';
import { workingHoursQueryKeys } from '../utils/constants';

const NOT_FOUND_STATUS = 404;

// null while the bank's default working hours have not been defined yet (the list's empty state):
// either the service 404s, or it responds with an otherwise-empty record.
const useWorkingHoursQuery = () =>
  useQuery({
    queryKey: workingHoursQueryKeys.default(),
    queryFn: async () => {
      try {
        const workingHours = toWorkingHours(await Api.getWorkingHours());
        return isEmptyObjectValues(workingHours) ? null : workingHours;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === NOT_FOUND_STATUS) return null;
        throw error;
      }
    },
  });

export default useWorkingHoursQuery;
