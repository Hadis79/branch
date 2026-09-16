import type { GroupListQueryParams } from './param-util';

export enum WorkingCalendarGroupPage {
  LIST = 'list',
  ADD = 'add',
  EDIT = 'edit',
  DETAILS = 'upload-details',
}

export const WORKING_CALENDAR_GROUP_PATH = '/working-calendar-groups';
const GROUPS_QUERY_KEY = 'groups';

export const groupQueryKeys = {
  all: [GROUPS_QUERY_KEY] as const,
  units: [GROUPS_QUERY_KEY, 'units'] as const,
  delete: [GROUPS_QUERY_KEY, 'delete'] as const,
  list: (params: GroupListQueryParams) => [...groupQueryKeys.all, 'list', params] as const,
  name: (groupName: string) => [...groupQueryKeys.all, 'name', groupName] as const,
};

export const groupsMutationKeys = {
  create: [GROUPS_QUERY_KEY, 'create'] as const,
  upload: [GROUPS_QUERY_KEY, 'upload'] as const,
  update: [GROUPS_QUERY_KEY, 'update'] as const,
  delete: [GROUPS_QUERY_KEY, 'delete'] as const,
};
