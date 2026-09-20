import { useQuery } from '@tanstack/react-query';

import { Api } from '../services';
import { holidayQueryKeys } from '../utils/constants';

// Provinces as select options; the whole province is kept, because creating a holiday sends its unit codes too
const useProvincesQuery = () =>
  useQuery({
    queryKey: holidayQueryKeys.provinces(),
    queryFn: Api.getProvinces,
    select: (provinces) =>
      provinces.map((province) => ({ value: province.provinceName, label: province.provinceName, province })),
  });

export default useProvincesQuery;
