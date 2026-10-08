import { useQuery } from '@tanstack/react-query';

import { Api } from '../services';
import useHolidayStore from '../store/use-widget-store';
import { holidayQueryKeys } from '../utils/constants';

// The service returns the whole list; the table pages through it
const useHolidaysQuery = () => {
  const filter = useHolidayStore((state) => state.filter);

  return useQuery({
    queryKey: holidayQueryKeys.list(filter),
    queryFn: () => Api.getHolidays(filter),
  });
};

export default useHolidaysQuery;
