import { skipToken, useQuery } from '@tanstack/react-query';

import { Api } from '../services';
import { groupQueryKeys } from '../utils/constants';
import useQueryErrorMessage from '../hooks/use-query-error-message';

const useGroupDetailsQuery = (id?: string | null) => {
  const query = useQuery({
    queryKey: groupQueryKeys.details(id ?? ''),
    queryFn: id ? () => Api.getGroupDetails(id) : skipToken,
  });

  useQueryErrorMessage(query.error);

  return query;
};

export default useGroupDetailsQuery;
