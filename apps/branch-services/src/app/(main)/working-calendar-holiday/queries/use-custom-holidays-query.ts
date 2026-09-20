import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { Api } from '../services';
import useHolidayStore from '../store/use-widget-store';
import { holidayQueryKeys } from '../utils/constants';

// The service returns the whole list; the table pages through it
const useCustomHolidaysQuery = () => {
  const filter = useHolidayStore((state) => state.customFilter);

  return useQuery({
    queryKey: holidayQueryKeys.customList(filter),
    queryFn: () => Api.getCustomHolidays(filter),
    placeholderData: keepPreviousData,
  });
};

export default useCustomHolidaysQuery;
