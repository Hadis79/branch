import axios from 'axios';

import { bbpUrl, client } from '@branch-services/client';

import type {
  GroupResponse,
  ProvinceResponse,
  WorkingHoursExceptionRequest,
  WorkingHoursExceptionResponse,
  WorkingHoursInfoResponse,
  WorkingHoursRequest,
} from '../utils/types';

const WORK_TIME_URL = `${bbpUrl}/calendar/work-time`;
// Shared with working-calendar-holiday's own province list
const PROVINCE_LIST_URL = `${bbpUrl}/calendar/holiday/province/list`;
// Every group an exception can be scoped to, unpaginated
const GROUP_LIST_URL = `${bbpUrl}/calendar/group/work-time-list`;
const NOT_FOUND_STATUS = 404;

// Confirmed: GET .../default/info, the exception/* endpoints below, and the province list. The
// default-hours create/update endpoints are still guesses. Request shaping and response mapping
// happen in services/mappers.ts; the only normalization here is treating a missing default record
// (404) as null instead of an application error.
const Api = {
  getWorkingHours: async (): Promise<WorkingHoursInfoResponse | null> => {
    try {
      const response = await client.get<WorkingHoursInfoResponse>(`${WORK_TIME_URL}/default/info`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === NOT_FOUND_STATUS) return null;
      throw error;
    }
  },
  createWorkingHours: async (payload: WorkingHoursRequest): Promise<WorkingHoursInfoResponse> => {
    const response = await client.post<WorkingHoursInfoResponse>(`${WORK_TIME_URL}/default`, payload);
    return response.data;
  },
  updateWorkingHours: async (payload: WorkingHoursRequest): Promise<WorkingHoursInfoResponse> => {
    const response = await client.post<WorkingHoursInfoResponse>(`${WORK_TIME_URL}/default`, payload);
    return response.data;
  },
  getProvinces: async (): Promise<ProvinceResponse[]> => {
    const response = await client.get<ProvinceResponse[]>(PROVINCE_LIST_URL);
    return response.data;
  },
  getGroups: async (): Promise<GroupResponse[]> => {
    const response = await client.get<GroupResponse[]>(GROUP_LIST_URL);
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
