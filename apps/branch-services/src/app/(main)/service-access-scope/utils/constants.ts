import type { DayOfWeek, PageParams, ScopeType } from './types';

// Set to false to switch every request to the real service (services/api.ts). None of the scope
// endpoints are confirmed yet; the service, group and unit lists are the ones the other modules use.
export const USE_MOCK_API = true;

export const SERVICE_ACCESS_SCOPE_PATH = '/service-access-scope';

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

// The service list is paginated; a scope's service is picked from all of them at once
export const SERVICE_OPTIONS_PAGE_SIZE = 1000;

export const DEFAULT_PAGE_PARAMS: PageParams = { page: 1, size: 10 };

// Tab order of the create form; translation keys of the tab labels and the list's scope type
export const SCOPE_TYPES: { type: ScopeType; labelKey: string; fieldLabelKey: string }[] = [
  { type: 'GROUP', labelKey: 'scope_type_group', fieldLabelKey: 'group_field_label' },
  { type: 'UNIT', labelKey: 'scope_type_unit', fieldLabelKey: 'unit_field_label' },
];

// Values are part of the URL (`?step=`) and are shown by the breadcrumb (translation keys)
export enum ServiceAccessScopePage {
  LIST = 'list',
  CREATE = 'new-scope',
  AFFECTED_UNITS = 'affected-units',
}

const SERVICE_ACCESS_SCOPE_QUERY_KEY = 'service-access-scope';

export const serviceAccessScopeQueryKeys = {
  scopes: () => [SERVICE_ACCESS_SCOPE_QUERY_KEY, 'scopes'] as const,
  services: () => [SERVICE_ACCESS_SCOPE_QUERY_KEY, 'services'] as const,
  groups: () => [SERVICE_ACCESS_SCOPE_QUERY_KEY, 'groups'] as const,
  units: () => [SERVICE_ACCESS_SCOPE_QUERY_KEY, 'units'] as const,
  groupUnits: (groupId: string, params: PageParams) =>
    [SERVICE_ACCESS_SCOPE_QUERY_KEY, 'group-units', groupId, params] as const,
};

export const serviceAccessScopeMutationKeys = {
  create: [SERVICE_ACCESS_SCOPE_QUERY_KEY, 'create'] as const,
  delete: [SERVICE_ACCESS_SCOPE_QUERY_KEY, 'delete'] as const,
};
