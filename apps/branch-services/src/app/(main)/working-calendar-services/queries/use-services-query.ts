import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { Api } from '../services';
import useServiceStore from '../store/use-widget-store';
import { serviceQueryKeys } from '../utils/constants';

const useServicesQuery = () => {
  const pagination = useServiceStore((state) => state.pagination);
  const filter = useServiceStore((state) => state.filter);
  const params = { ...pagination, ...filter };

  return useQuery({
    queryKey: serviceQueryKeys.list(params),
    queryFn: () => Api.getServices(params),
    placeholderData: keepPreviousData,
  });
};

export default useServicesQuery;
