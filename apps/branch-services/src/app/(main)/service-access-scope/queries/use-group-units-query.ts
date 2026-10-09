import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { Api } from '../services';
import { serviceAccessScopeQueryKeys } from '../utils/constants';
import type { PageParams } from '../utils/types';

// One page of a group's units; the previous page stays on screen while the next one loads
const useGroupUnitsQuery = (groupId: string | undefined, params: PageParams) =>
  useQuery({
    queryKey: serviceAccessScopeQueryKeys.groupUnits(groupId ?? '', params),
    queryFn: () => Api.getGroupUnits(groupId as string, params),
    placeholderData: keepPreviousData,
    enabled: Boolean(groupId),
  });

export default useGroupUnitsQuery;
