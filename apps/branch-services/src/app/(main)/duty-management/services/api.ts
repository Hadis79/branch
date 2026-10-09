import { bbpUrl, client } from '@branch-services/client';

import type {
  GroupResponse,
  DutyRequest,
  DutyResponse,
  PageParams,
  UnitPageResponse,
  UnitResponse,
} from '../utils/types';

// Guessed: none of the duty endpoints are confirmed yet
const DUTIES_URL = `${bbpUrl}/calendar/duty`;
// Guessed: the groups of the duty type only (working-hours groups are left out)
const DUTY_GROUP_LIST_URL = `${bbpUrl}/calendar/group/duty-list`;
// Shared with working-calendar-groups
const GROUPS_URL = `${bbpUrl}/calendar/group`;
const UNIT_LIST_URL = `${bbpUrl}/calendar/unit-list`;

// A plain pass-through: request shaping and response mapping happen in the query/mutation hooks
// (services/mappers.ts), like the other working-calendar-* modules.
const Api = {
  getDuties: async (): Promise<DutyResponse[]> => {
    const response = await client.get<DutyResponse[]>(`${DUTIES_URL}/list`);
    return response.data;
  },
  createDuty: async (payload: DutyRequest): Promise<DutyResponse> => {
    const response = await client.post<DutyResponse>(`${DUTIES_URL}/create`, payload);
    return response.data;
  },
  deleteDuty: async (id: string): Promise<void> => {
    await client.delete<void>(`${DUTIES_URL}/${id}`);
  },
  getGroups: async (): Promise<GroupResponse[]> => {
    const response = await client.get<GroupResponse[]>(DUTY_GROUP_LIST_URL);
    return response.data;
  },
  getUnits: async (): Promise<UnitResponse[]> => {
    const response = await client.get<UnitResponse[]>(UNIT_LIST_URL);
    return response.data;
  },
  // The service pages are zero-based; the table's are one-based
  getGroupUnits: async (groupId: string, { page, size }: PageParams): Promise<UnitPageResponse> => {
    const response = await client.get<UnitPageResponse>(`${GROUPS_URL}/${groupId}`, {
      params: { page: page - 1, size },
    });
    return response.data;
  },
};

export default Api;
