import type { ServiceListParams } from './types';

// Set to false to switch every request to the real service (services/api.ts)
export const USE_MOCK_API = false;

export const ENGLISH_NAME_PATTERN = /^[A-Za-z0-9\s_-]+$/;

const SERVICES_QUERY_KEY = 'working-calendar-services';
const SERVICE_LISTS_KEY = [SERVICES_QUERY_KEY, 'list'] as const;

export const serviceQueryKeys = {
  lists: () => SERVICE_LISTS_KEY,
  list: (params: ServiceListParams) => [...SERVICE_LISTS_KEY, params] as const,
};

export const serviceMutationKeys = {
  create: [SERVICES_QUERY_KEY, 'create'] as const,
  update: [SERVICES_QUERY_KEY, 'update'] as const,
};
