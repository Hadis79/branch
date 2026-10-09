import { bbpUrl, client } from '@branch-services/client';

import { SERVICE_OPTIONS_PAGE_SIZE } from '../utils/constants';
import type {
  GroupResponse,
  PageParams,
  ServiceAccessScopeRequest,
  ServiceAccessScopeResponse,
  ServiceListResponse,
  UnitPageResponse,
  UnitResponse,
} from '../utils/types';

// Guessed: none of the scope endpoints are confirmed yet
const SCOPES_URL = `${bbpUrl}/calendar/service-scope`;
// Shared with working-calendar-services
const SERVICE_LIST_URL = `${bbpUrl}/calendar/service/list`;
// Shared with working-hours
const GROUP_LIST_URL = `${bbpUrl}/calendar/group/work-time-list`;
// Shared with working-calendar-groups
const GROUPS_URL = `${bbpUrl}/calendar/group`;
const UNIT_LIST_URL = `${bbpUrl}/calendar/unit-list`;

// A plain pass-through: request shaping and response mapping happen in the query/mutation hooks
// (services/mappers.ts), like the other working-calendar-* modules.
const Api = {
  getScopes: async (): Promise<ServiceAccessScopeResponse[]> => {
    const response = await client.get<ServiceAccessScopeResponse[]>(`${SCOPES_URL}/list`);
    return response.data;
  },
  createScope: async (payload: ServiceAccessScopeRequest): Promise<ServiceAccessScopeResponse> => {
    const response = await client.post<ServiceAccessScopeResponse>(`${SCOPES_URL}/create`, payload);
    return response.data;
  },
  deleteScope: async (id: string): Promise<void> => {
    await client.delete<void>(`${SCOPES_URL}/${id}`);
  },
  // The service pages are zero-based
  getServices: async (): Promise<ServiceListResponse> => {
    const response = await client.get<ServiceListResponse>(SERVICE_LIST_URL, {
      params: { page: 0, size: SERVICE_OPTIONS_PAGE_SIZE },
    });
    return response.data;
  },
  getGroups: async (): Promise<GroupResponse[]> => {
    const response = await client.get<GroupResponse[]>(GROUP_LIST_URL);
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
