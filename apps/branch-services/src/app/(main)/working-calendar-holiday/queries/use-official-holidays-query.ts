import { skipToken, useQuery } from '@tanstack/react-query';

import { Api } from '../services';
import { holidayQueryKeys } from '../utils/constants';

// Holidays of one official year record (a null id skips the request)
const useOfficialHolidaysQuery = (id: string | null) =>
  useQuery({
    queryKey: holidayQueryKeys.officialHolidays(id ?? ''),
    queryFn: id ? () => Api.getOfficialHolidays(id) : skipToken,
  });

export default useOfficialHolidaysQuery;
