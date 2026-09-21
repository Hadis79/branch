import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { Api } from '../services';
import useServiceStore from '../store/use-widget-store';
import { serviceQueryKeys } from '../utils/constants';
import { PERSIAN_REGEX } from '../utils/utils';

const useServicesQuery = () => {
  const pagination = useServiceStore((state) => state.pagination);
  const filter = useServiceStore((state) => state.filter);
  const nextName = filter?.name?.trim() || undefined;
  const nextFilter = {
    persianName: PERSIAN_REGEX.test(nextName ?? '') ? nextName : undefined,
    englishName: PERSIAN_REGEX.test(nextName ?? '') ? undefined : nextName,
  };
  const params = { ...pagination, ...nextFilter };

  return useQuery({
    queryKey: serviceQueryKeys.list(params),
    queryFn: () => Api.getServices(params),
    placeholderData: keepPreviousData,
  });
};

export default useServicesQuery;
