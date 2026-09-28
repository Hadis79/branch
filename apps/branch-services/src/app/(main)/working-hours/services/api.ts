import { bbpUrl, client } from '@branch-services/client';

import type { WorkingHoursInfoResponse, WorkingHoursRequest } from '../utils/types';

const WORK_TIME_URL = `${bbpUrl}/calendar/work-time`;

// Only GET .../default/info is confirmed; the rest are guesses until the real endpoints are provided.
// This stays a plain pass-through: request shaping and response mapping happen in the query/mutation
// hooks (services/mappers.ts), not here, like the other working-calendar-* modules.
const Api = {
  getWorkingHours: async (): Promise<WorkingHoursInfoResponse> => {
    const response = await client.get<WorkingHoursInfoResponse>(`${WORK_TIME_URL}/default/info`);
    return response.data;
  },
  createWorkingHours: async (payload: WorkingHoursRequest): Promise<WorkingHoursInfoResponse> => {
    const response = await client.post<WorkingHoursInfoResponse>(`${WORK_TIME_URL}/default`, payload);
    return response.data;
  },
  updateWorkingHours: async (payload: WorkingHoursRequest): Promise<WorkingHoursInfoResponse> => {
    const response = await client.post<WorkingHoursInfoResponse>(`${WORK_TIME_URL}/default`, payload);
    return response.data;
  },
  deleteException: async (id: string): Promise<void> => {
    await client.delete<void>(`${WORK_TIME_URL}/exceptions/${id}`);
  },
};

export default Api;
