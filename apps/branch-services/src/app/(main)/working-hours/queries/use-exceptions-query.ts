import { useQuery } from '@tanstack/react-query';

import { Api } from '../services';
import { toWorkingHoursException } from '../services/mappers';
import { workingHoursQueryKeys } from '../utils/constants';

const useExceptionsQuery = () =>
  useQuery({
    queryKey: workingHoursQueryKeys.exceptions(),
    queryFn: async () => (await Api.getExceptions()).map(toWorkingHoursException),
  });

export default useExceptionsQuery;
