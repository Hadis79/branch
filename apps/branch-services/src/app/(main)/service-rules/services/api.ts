import { bbpUrl, client } from '@branch-services/client';

import { SERVICE_OPTIONS_PAGE_SIZE } from '../utils/constants';
import type { ServiceListResponse, ServiceRuleRequest, ServiceRuleResponse } from '../utils/types';

// Guessed: none of the rule endpoints are confirmed yet
const RULES_URL = `${bbpUrl}/calendar/rule`;
// Shared with working-calendar-services
const SERVICE_LIST_URL = `${bbpUrl}/calendar/service/list`;

// A plain pass-through: request shaping and response mapping happen in the query/mutation hooks
// (services/mappers.ts), like the other working-calendar-* modules.
const Api = {
  getRules: async (): Promise<ServiceRuleResponse[]> => {
    const response = await client.get<ServiceRuleResponse[]>(`${RULES_URL}/list`);
    return response.data;
  },
  createRule: async (payload: ServiceRuleRequest): Promise<ServiceRuleResponse> => {
    const response = await client.post<ServiceRuleResponse>(`${RULES_URL}/create`, payload);
    return response.data;
  },
  deleteRule: async (id: string): Promise<void> => {
    await client.delete<void>(`${RULES_URL}/${id}`);
  },
  // The service pages are zero-based
  getServices: async (): Promise<ServiceListResponse> => {
    const response = await client.get<ServiceListResponse>(SERVICE_LIST_URL, {
      params: { page: 0, size: SERVICE_OPTIONS_PAGE_SIZE },
    });
    return response.data;
  },
};

export default Api;
