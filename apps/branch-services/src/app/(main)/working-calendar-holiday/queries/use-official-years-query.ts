import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { Api } from '../services';
import useHolidayStore from '../store/use-widget-store';
import { holidayQueryKeys } from '../utils/constants';

const useOfficialYearsQuery = () => {
  const filter = useHolidayStore((state) => state.officialFilter);
  const params = { ...filter };

  return useQuery({
    queryKey: holidayQueryKeys.officialList(params),
    queryFn: () => Api.getOfficialYears(params),
    placeholderData: keepPreviousData,
  });
};

export default useOfficialYearsQuery;
