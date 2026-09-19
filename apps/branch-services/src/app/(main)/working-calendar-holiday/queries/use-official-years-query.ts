import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { Api } from '../services';
import useHolidayStore from '../store/use-widget-store';
import { holidayQueryKeys } from '../utils/constants';

const useOfficialYearsQuery = () => {
  const pagination = useHolidayStore((state) => state.officialPagination);
  const filter = useHolidayStore((state) => state.officialFilter);
  const params = { ...pagination, ...filter };

  return useQuery({
    queryKey: holidayQueryKeys.officialList(params),
    queryFn: () => Api.getOfficialYears(params),
    placeholderData: keepPreviousData,
  });
};

export default useOfficialYearsQuery;
