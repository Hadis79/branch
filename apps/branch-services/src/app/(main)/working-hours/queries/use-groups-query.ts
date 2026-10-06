import { useQuery } from '@tanstack/react-query';

import { Api } from '../services';
import { workingHoursQueryKeys } from '../utils/constants';

// The working-hours groups an exception can be scoped to, as select options
const useGroupsQuery = () =>
  useQuery({
    queryKey: workingHoursQueryKeys.groups(),
    queryFn: Api.getGroups,
    select: (groups) => groups.map((group) => ({ value: String(group.id), label: group.name })),
  });

export default useGroupsQuery;
