// Set to true to switch every request back to the mock service (services/mock-api.ts).
// GET (getWorkingHours) hits the real, confirmed work-time/default/info endpoint; the other
// operations are still guessed endpoints and will likely fail against the real backend.
export const USE_MOCK_API = false;

export const WORKING_HOURS_PATH = '/working-hours';

// Fixed, not user-editable; sent as-is on every create/update request
export const DEFAULT_WORKING_HOURS_TITLE = 'ساعت کاری پیش‌فرض بانک ملی ایران';

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
