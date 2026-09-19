import { useQuery } from '@tanstack/react-query';

import { Api } from '../services';
import { holidayQueryKeys } from '../utils/constants';

const useRegionsQuery = () =>
  useQuery({
    queryKey: holidayQueryKeys.regions(),
    queryFn: Api.getRegions,
    select: (regions) => regions.map(({ code, name }) => ({ value: code, label: name })),
  });

export default useRegionsQuery;
