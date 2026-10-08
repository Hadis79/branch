import type { DayOfWeek } from './types';

// Set to false to switch every request to the real service (services/api.ts). None of the rule
// endpoints are confirmed yet; the service list is the one working-calendar-services uses.
export const USE_MOCK_API = true;

export const SERVICE_RULES_PATH = '/service-rules';

// Every weekday in display order; dayName is sent to the service as-is
export const WEEK_DAYS: { dayOfWeek: DayOfWeek; dayName: string }[] = [
  { dayOfWeek: 'SATURDAY', dayName: 'شنبه' },
  { dayOfWeek: 'SUNDAY', dayName: 'یکشنبه' },
  { dayOfWeek: 'MONDAY', dayName: 'دوشنبه' },
  { dayOfWeek: 'TUESDAY', dayName: 'سه‌شنبه' },
  { dayOfWeek: 'WEDNESDAY', dayName: 'چهارشنبه' },
  { dayOfWeek: 'THURSDAY', dayName: 'پنج‌شنبه' },
  { dayOfWeek: 'FRIDAY', dayName: 'جمعه' },
];

// The service list is paginated; a rule's service is picked from all of them at once
export const SERVICE_OPTIONS_PAGE_SIZE = 1000;

// Values are part of the URL (`?step=`) and are shown by the breadcrumb (translation keys)
export enum ServiceRulesPage {
  LIST = 'list',
  CREATE = 'new-rule',
}

const SERVICE_RULES_QUERY_KEY = 'service-rules';

export const serviceRulesQueryKeys = {
  rules: () => [SERVICE_RULES_QUERY_KEY, 'rules'] as const,
  services: () => [SERVICE_RULES_QUERY_KEY, 'services'] as const,
};

export const serviceRulesMutationKeys = {
  create: [SERVICE_RULES_QUERY_KEY, 'create'] as const,
  delete: [SERVICE_RULES_QUERY_KEY, 'delete'] as const,
};
