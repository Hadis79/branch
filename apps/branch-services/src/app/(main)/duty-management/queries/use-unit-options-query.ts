import { useQuery } from '@tanstack/react-query';

import { Api } from '../services';
import { toUnitOption } from '../services/mappers';
import { dutyQueryKeys } from '../utils/constants';
import type { UnitResponse } from '../utils/types';

const selectUnitOptions = (units: UnitResponse[]) => units.map(toUnitOption);

// Every unit a duty can apply to on its own; fetched once its tab is opened
const useUnitOptionsQuery = (enabled = true) =>
  useQuery({
    queryKey: dutyQueryKeys.units(),
    queryFn: Api.getUnits,
    select: selectUnitOptions,
    enabled,
  });

export default useUnitOptionsQuery;
