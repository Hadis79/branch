import { useQuery } from '@tanstack/react-query';

import { Api } from '../services';
import { toServiceAccessScope } from '../services/mappers';
import { serviceAccessScopeQueryKeys } from '../utils/constants';
import type { ServiceAccessScopeResponse } from '../utils/types';

const selectScopes = (scopes: ServiceAccessScopeResponse[]) => scopes.map(toServiceAccessScope);

const useScopesQuery = (enabled = true) =>
  useQuery({
    queryKey: serviceAccessScopeQueryKeys.scopes(),
    queryFn: Api.getScopes,
    select: selectScopes,
    enabled,
  });

export default useScopesQuery;
