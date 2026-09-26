import { skipToken, useQuery } from '@tanstack/react-query';

import { Api } from '../services';
import { holidayQueryKeys } from '../utils/constants';

// Holidays of one uploaded year (a null year skips the request)
const useOfficialHolidaysQuery = (year: number | null) =>
  useQuery({
    queryKey: holidayQueryKeys.officialHolidays(year ?? 0),
    queryFn: year ? () => Api.getOfficialHolidays(year) : skipToken,
  });

export default useOfficialHolidaysQuery;
