import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { Api } from '../services';
import useHolidayStore from '../store/use-widget-store';
import { holidayQueryKeys } from '../utils/constants';

const useCustomHolidaysQuery = () => {
  const pagination = useHolidayStore((state) => state.customPagination);
  const filter = useHolidayStore((state) => state.customFilter);
  const params = { ...pagination, ...filter };

  return useQuery({
    queryKey: holidayQueryKeys.customList(params),
    queryFn: () => Api.getCustomHolidays(params),
    placeholderData: keepPreviousData,
  });
};

export default useCustomHolidaysQuery;
