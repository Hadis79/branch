import { useQuery } from '@tanstack/react-query';

import { Api } from '../services';
import { toDuty } from '../services/mappers';
import { dutyQueryKeys } from '../utils/constants';
import type { DutyResponse } from '../utils/types';

const selectDuties = (duties: DutyResponse[]) => duties.map(toDuty);

const useDutiesQuery = (enabled = true) =>
  useQuery({
    queryKey: dutyQueryKeys.duties(),
    queryFn: Api.getDuties,
    select: selectDuties,
    enabled,
  });

export default useDutiesQuery;
