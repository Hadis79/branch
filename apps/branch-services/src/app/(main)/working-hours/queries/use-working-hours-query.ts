import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import { Api } from '../services';
import { workingHoursQueryKeys } from '../utils/constants';

const NOT_FOUND_STATUS = 404;

// null while the bank's default working hours have not been defined yet (the list's empty state)
const useWorkingHoursQuery = () =>
  useQuery({
    queryKey: workingHoursQueryKeys.default(),
    queryFn: async () => {
      try {
        return await Api.getWorkingHours();
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === NOT_FOUND_STATUS) return null;
        throw error;
      }
    },
  });

export default useWorkingHoursQuery;
