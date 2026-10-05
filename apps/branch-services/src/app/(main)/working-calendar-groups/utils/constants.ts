import type { GroupListQueryParams } from './param-util';
import { GroupType, type PageParams } from './types';

// Translation key per group type, shared by the list filter and the list column
export const GROUP_TYPE_LABELS: Record<GroupType, string> = {
  [GroupType.WORK_TIME]: 'group_type_working_time',
  [GroupType.DUTY]: 'group_type_duty',
};

// `''` stands for "every type" in the filter; it's dropped before being sent as a query param
export const GROUP_TYPE_FILTER_OPTIONS: { value: GroupType | ''; label: string }[] = [
  { value: '', label: 'group_type_all' },
  { value: GroupType.WORK_TIME, label: GROUP_TYPE_LABELS[GroupType.WORK_TIME] },
  { value: GroupType.DUTY, label: GROUP_TYPE_LABELS[GroupType.DUTY] },
];

// No "all" entry: the create form picks exactly one type
export const GROUP_TYPE_OPTIONS: { value: GroupType; label: string }[] = [
  { value: GroupType.WORK_TIME, label: GROUP_TYPE_LABELS[GroupType.WORK_TIME] },
  { value: GroupType.DUTY, label: GROUP_TYPE_LABELS[GroupType.DUTY] },
];

export enum WorkingCalendarGroupPage {
  LIST = 'list',
  ADD = 'add',
  EDIT = 'edit',
  DETAILS = 'upload-details',
  // Read-only list of a group's units, opened from the list's "show details" action
  GROUP_DETAILS = 'group-details',
}

// Set to false to switch every request to the real service (services/api.ts)
export const USE_MOCK_API = true;

// Values are part of the URL (`?mode=`), keep them stable
export enum EntryMode {
  FILE = 'upload-file',
  MANUAL = 'manual',
}

export const EDIT_MODE_LABELS: Record<EntryMode, { title: string; description: string; confirm: string }> = {
  [EntryMode.FILE]: {
    title: 'edit_mode_replace',
    description: 'edit_mode_replace_description',
    confirm: 'confirm_edit_replace_description',
  },
  [EntryMode.MANUAL]: {
    title: 'edit_mode_manual',
    description: 'edit_mode_manual_description',
    confirm: 'confirm_edit_manual_description',
  },
};

export const WORKING_CALENDAR_GROUP_PATH = '/working-calendar-groups';
const GROUPS_QUERY_KEY = 'groups';
const GROUP_LISTS_KEY = [GROUPS_QUERY_KEY, 'list'] as const;

// Hierarchical keys: mutations invalidate `lists` / `groupUnits(id)` and leave the unit list cached
export const groupQueryKeys = {
  units: () => [GROUPS_QUERY_KEY, 'units'] as const,
  lists: () => GROUP_LISTS_KEY,
  list: (params: GroupListQueryParams) => [...GROUP_LISTS_KEY, params] as const,
  groupUnits: (id: string) => [GROUPS_QUERY_KEY, 'group-units', id] as const,
  groupUnitsPage: (id: string, params: PageParams) => [GROUPS_QUERY_KEY, 'group-units', id, params] as const,
};

export const groupsMutationKeys = {
  create: [GROUPS_QUERY_KEY, 'create'] as const,
  upload: [GROUPS_QUERY_KEY, 'upload'] as const,
  update: [GROUPS_QUERY_KEY, 'update'] as const,
  delete: [GROUPS_QUERY_KEY, 'delete'] as const,
  downloadSample: [GROUPS_QUERY_KEY, 'download-sample'] as const,
};
