import { skipToken, useQuery } from '@tanstack/react-query';

import { Api } from '../services';
import { groupQueryKeys } from '../utils/constants';
import type { PageParams } from '../utils/types';
import useQueryErrorMessage from '../hooks/use-query-error-message';

// One page of a group's units (a null id skips the request)
const useGroupUnitsQuery = (id: string | null, pagination: PageParams) => {
  const query = useQuery({
    queryKey: groupQueryKeys.groupUnitsPage(id ?? '', pagination),
    queryFn: id ? () => Api.getGroupUnits({ id, ...pagination }) : skipToken,
  });

  useQueryErrorMessage(query.error);

  return query;
};

export default useGroupUnitsQuery;
