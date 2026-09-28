import { useQuery } from '@tanstack/react-query';

import { Api } from '../services';
import { workingHoursQueryKeys } from '../utils/constants';

// The nationwide entry (no unit codes of its own) is excluded: the exception form's scope
// already has its own "national" option, so it shouldn't also show up as a "province"
const useProvincesQuery = () =>
  useQuery({
    queryKey: workingHoursQueryKeys.provinces(),
    queryFn: Api.getProvinces,
    select: (provinces) =>
      provinces
        .filter((province) => province.unitCodes.length > 0)
        .map((province) => ({ value: province.provinceName, label: province.provinceName })),
  });

export default useProvincesQuery;
