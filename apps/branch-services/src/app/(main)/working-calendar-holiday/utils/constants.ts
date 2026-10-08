import type { HolidayListFilter } from './types';

// Set to false to switch every request to the real service (services/api.ts)
export const USE_MOCK_API = false;

export const HOLIDAY_PATH = '/working-calendar-holiday';

// Values are part of the URL (`?step=`) and are shown by the breadcrumb (translation keys)
export enum HolidayPage {
  LIST = 'list',
  CREATE = 'new',
  UPLOAD_DETAILS = 'upload-details',
}

// TODO: confirm the value the non-calendar holidays are saved with; the service only documents OFFICIAL
export enum OfficialStatus {
  OFFICIAL = 'OFFICIAL',
  UNOFFICIAL = 'UNOFFICIAL',
}

// Texts of the confirm modal of each create form
export const CONFIRM_CREATE_LABELS = {
  official: { title: 'confirm_official_title', description: 'confirm_official_description' },
  custom: { title: 'confirm_custom_title', description: 'confirm_custom_description' },
} as const;

// Translation key per holiday type, shared by the list column, the filter and the edit form
export const OFFICIAL_STATUS_LABELS: Record<OfficialStatus, string> = {
  [OfficialStatus.OFFICIAL]: 'official',
  [OfficialStatus.UNOFFICIAL]: 'unofficial',
};

const HOLIDAY_QUERY_KEY = 'working-calendar-holiday';

export const holidayQueryKeys = {
  provinces: () => [HOLIDAY_QUERY_KEY, 'provinces'] as const,
  lists: () => [HOLIDAY_QUERY_KEY, 'list'] as const,
  list: (filter: HolidayListFilter) => [HOLIDAY_QUERY_KEY, 'list', filter] as const,
};

export const holidayMutationKeys = {
  upload: [HOLIDAY_QUERY_KEY, 'upload'] as const,
  createOfficial: [HOLIDAY_QUERY_KEY, 'create-official'] as const,
  createCustom: [HOLIDAY_QUERY_KEY, 'create-custom'] as const,
  update: [HOLIDAY_QUERY_KEY, 'update'] as const,
  delete: [HOLIDAY_QUERY_KEY, 'delete'] as const,
};
