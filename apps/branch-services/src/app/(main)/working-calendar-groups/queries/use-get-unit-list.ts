import { useQuery } from '@tanstack/react-query';

import { Api } from '../services';
import { groupQueryKeys } from '../utils/constants';
import useQueryErrorMessage from '../hooks/use-query-error-message';

const useGetUnitList = () => {
  const query = useQuery({
    queryKey: groupQueryKeys.units(),
    queryFn: Api.getUnitList,
  });

  useQueryErrorMessage(query.error);

  return query;
};

export default useGetUnitList;
