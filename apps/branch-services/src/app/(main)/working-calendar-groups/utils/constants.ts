import type { GroupListQueryParams } from './param-util';
import type { PageParams } from './types';

export enum WorkingCalendarGroupPage {
  LIST = 'list',
  ADD = 'add',
  EDIT = 'edit',
  DETAILS = 'upload-details',
}

// Set to false to switch every request to the real service (services/api.ts)
export const USE_MOCK_API = false;

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
