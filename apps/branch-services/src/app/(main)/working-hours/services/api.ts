import { bbpUrl, client } from '@branch-services/client';

import { toWorkingHours } from './mappers';
import type { WorkingHours, WorkingHoursDto, WorkingHoursInfoResponse } from '../utils/types';

const WORK_TIME_URL = `${bbpUrl}/work-time`;

// Only GET .../default/info is confirmed; the rest are guesses until the real endpoints are provided.
// A 404 (not defined yet) is handled by the query hook, not here, like every other endpoint's errors.
const Api = {
  getWorkingHours: async (): Promise<WorkingHours> => {
    const response = await client.get<WorkingHoursInfoResponse>(`${WORK_TIME_URL}/default/info`);
    return toWorkingHours(response.data);
  },
  createWorkingHours: async ({ from, to }: WorkingHoursDto): Promise<WorkingHours> => {
    const response = await client.post<WorkingHoursInfoResponse>(`${WORK_TIME_URL}/default`, {
      startWorkingHour: from,
      endWorkingHour: to,
    });
    return toWorkingHours(response.data);
  },
  updateWorkingHours: async ({ from, to }: WorkingHoursDto): Promise<WorkingHours> => {
    const response = await client.put<WorkingHoursInfoResponse>(`${WORK_TIME_URL}/default`, {
      startWorkingHour: from,
      endWorkingHour: to,
    });
    return toWorkingHours(response.data);
  },
  deleteException: async (id: string): Promise<void> => {
    await client.delete<void>(`${WORK_TIME_URL}/exceptions/${id}`);
  },
};

export default Api;
