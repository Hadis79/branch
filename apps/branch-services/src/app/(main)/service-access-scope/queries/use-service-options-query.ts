import { useQuery } from '@tanstack/react-query';

import { Api } from '../services';
import { toServiceOption } from '../services/mappers';
import { serviceAccessScopeQueryKeys } from '../utils/constants';
import type { ServiceListResponse } from '../utils/types';

// Only an active service can be given an access scope
const selectServiceOptions = ({ content }: ServiceListResponse) =>
  content.filter((service) => service.active).map(toServiceOption);

const useServiceOptionsQuery = () =>
  useQuery({
    queryKey: serviceAccessScopeQueryKeys.services(),
    queryFn: Api.getServices,
    select: selectServiceOptions,
  });

export default useServiceOptionsQuery;
