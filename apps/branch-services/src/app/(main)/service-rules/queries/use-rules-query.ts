import { useQuery } from '@tanstack/react-query';

import { Api } from '../services';
import { toServiceRule } from '../services/mappers';
import { serviceRulesQueryKeys } from '../utils/constants';

const useRulesQuery = () =>
  useQuery({
    queryKey: serviceRulesQueryKeys.rules(),
    queryFn: async () => (await Api.getRules()).map(toServiceRule),
  });

export default useRulesQuery;
