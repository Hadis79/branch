import { useQuery } from '@tanstack/react-query';

import { Api } from '../services';
import { toGroupOption } from '../services/mappers';
import { serviceAccessScopeQueryKeys } from '../utils/constants';
import type { GroupResponse } from '../utils/types';

const selectGroupOptions = (groups: GroupResponse[]) => groups.map(toGroupOption);

// The working-hours groups a scope can apply to; fetched once their tab is opened
const useGroupOptionsQuery = (enabled = true) =>
  useQuery({
    queryKey: serviceAccessScopeQueryKeys.groups(),
    queryFn: Api.getGroups,
    select: selectGroupOptions,
    enabled,
  });

export default useGroupOptionsQuery;
