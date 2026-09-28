import { bbpUrl, client } from '@branch-services/client';

import type {
  WorkingHoursExceptionRequest,
  WorkingHoursExceptionResponse,
  WorkingHoursInfoResponse,
  WorkingHoursRequest,
} from '../utils/types';

const WORK_TIME_URL = `${bbpUrl}/calendar/work-time`;

// Confirmed: GET .../default/info, and the exception/* endpoints below. getProvinces and the
// default-hours create/update endpoints are still guesses. This stays a plain pass-through:
// request shaping and response mapping happen in the query/mutation hooks (services/mappers.ts),
// not here, like the other working-calendar-* modules.
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
  getProvinces: async (): Promise<string[]> => {
    const response = await client.get<string[]>(`${WORK_TIME_URL}/provinces`);
    return response.data;
  },
  getExceptions: async (): Promise<WorkingHoursExceptionResponse[]> => {
    const response = await client.get<WorkingHoursExceptionResponse[]>(`${WORK_TIME_URL}/exception/list`);
    return response.data;
  },
  createException: async (payload: WorkingHoursExceptionRequest): Promise<WorkingHoursExceptionResponse> => {
    const response = await client.post<WorkingHoursExceptionResponse>(`${WORK_TIME_URL}/exception/create`, payload);
    return response.data;
  },
  deleteException: async (id: string): Promise<void> => {
    await client.delete<void>(`${WORK_TIME_URL}/exception/${id}`);
  },
};

export default Api;
