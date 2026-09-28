import { useQuery } from '@tanstack/react-query';

import { Api } from '../services';
import { workingHoursQueryKeys } from '../utils/constants';

const useProvincesQuery = () =>
  useQuery({
    queryKey: workingHoursQueryKeys.provinces(),
    queryFn: Api.getProvinces,
    select: (provinces) => provinces.map((province) => ({ value: province, label: province })),
  });

export default useProvincesQuery;
