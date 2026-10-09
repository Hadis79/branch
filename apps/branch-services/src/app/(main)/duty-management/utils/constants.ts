import type { PageParams, ScopeType } from './types';

// Set to false to switch every request to the real service (services/api.ts). None of the duty
// endpoints are confirmed yet; the unit lists are the ones working-calendar-groups uses.
export const USE_MOCK_API = true;

export const DUTY_PATH = '/duty-management';

export const DEFAULT_PAGE_PARAMS: PageParams = { page: 1, size: 10 };

// Tab order of the create form, with the translation keys of each tab and of its picker
export const SCOPE_TYPES: {
  type: ScopeType;
  labelKey: string;
  fieldLabelKey: string;
  requiredKey: string;
  // The list card's name of the scope
  scopeKey: string;
}[] = [
  {
    type: 'GROUP',
    labelKey: 'scope_type_group',
    fieldLabelKey: 'group_field_label',
    requiredKey: 'group_required',
    scopeKey: 'scope_group',
  },
  {
    type: 'UNIT',
    labelKey: 'scope_type_unit',
    fieldLabelKey: 'unit_field_label',
    requiredKey: 'unit_required',
    scopeKey: 'scope_unit',
  },
];

// Values are part of the URL (`?step=`) and are shown by the breadcrumb (translation keys)
export enum DutyPage {
  LIST = 'list',
  CREATE = 'new-duty',
  AFFECTED_UNITS = 'affected-units',
}

const DUTY_QUERY_KEY = 'duty-management';

export const dutyQueryKeys = {
  duties: () => [DUTY_QUERY_KEY, 'duties'] as const,
  groups: () => [DUTY_QUERY_KEY, 'groups'] as const,
  units: () => [DUTY_QUERY_KEY, 'units'] as const,
  groupUnits: (groupId: string, params: PageParams) => [DUTY_QUERY_KEY, 'group-units', groupId, params] as const,
};

export const dutyMutationKeys = {
  create: [DUTY_QUERY_KEY, 'create'] as const,
  delete: [DUTY_QUERY_KEY, 'delete'] as const,
};
