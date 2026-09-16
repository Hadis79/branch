import { useQuery } from '@tanstack/react-query';

import Api from '../services/api';
import { groupQueryKeys } from '../utils/constants';
import { useGroupListParams } from '../utils/param-util';
import useQueryErrorMessage from '../hooks/use-query-error-message';

const useGroupListQuery = () => {
  const params = useGroupListParams();
  const query = useQuery({
    queryKey: groupQueryKeys.list(params),
    queryFn: () => Api.getGroupsHistory(params),
  });

  useQueryErrorMessage(query.error);

  return query;
};

export default useGroupListQuery;
