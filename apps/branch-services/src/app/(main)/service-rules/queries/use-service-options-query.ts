import { useQuery } from '@tanstack/react-query';

import { Api } from '../services';
import { toServiceOption } from '../services/mappers';
import { serviceRulesQueryKeys } from '../utils/constants';

// A rule can only be defined for an active service that allows its settings to be overridden
const useServiceOptionsQuery = () =>
  useQuery({
    queryKey: serviceRulesQueryKeys.services(),
    queryFn: Api.getServices,
    select: ({ content }) => content.filter((service) => service.active && service.overridable).map(toServiceOption),
  });

export default useServiceOptionsQuery;
