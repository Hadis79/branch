// Set to false to switch every request to the real service (services/api.ts)
export const USE_MOCK_API = true;

export const WORKING_HOURS_PATH = '/working-hours';

// Values are part of the URL (`?step=`) and are shown by the breadcrumb (translation keys)
export enum WorkingHoursPage {
  LIST = 'list',
  CREATE = 'define-default',
}

const WORKING_HOURS_QUERY_KEY = 'working-hours';

export const workingHoursQueryKeys = {
  default: () => [WORKING_HOURS_QUERY_KEY, 'default'] as const,
};

export const workingHoursMutationKeys = {
  create: [WORKING_HOURS_QUERY_KEY, 'create'] as const,
  update: [WORKING_HOURS_QUERY_KEY, 'update'] as const,
  deleteException: [WORKING_HOURS_QUERY_KEY, 'delete-exception'] as const,
};
