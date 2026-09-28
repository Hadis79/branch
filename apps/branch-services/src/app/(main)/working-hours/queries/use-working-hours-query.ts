import { useQuery } from '@tanstack/react-query';

import { Api } from '../services';
import { workingHoursQueryKeys } from '../utils/constants';

// null while the bank's default working hours have not been defined yet (the list's empty state)
const useWorkingHoursQuery = () =>
  useQuery({
    queryKey: workingHoursQueryKeys.default(),
    queryFn: Api.getWorkingHours,
  });

export default useWorkingHoursQuery;
