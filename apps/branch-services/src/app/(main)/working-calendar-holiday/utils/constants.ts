import type { CustomListFilter, OfficialListParams } from './types';

// Set to false to switch every request to the real service (services/api.ts)
export const USE_MOCK_API = false;

export const HOLIDAY_PATH = '/working-calendar-holiday';

// Values are part of the URL (`?step=`) and are shown by the breadcrumb (translation keys)
export enum HolidayPage {
  LIST = 'list',
  UPLOAD = 'upload',
  UPLOAD_DETAILS = 'upload-details',
  MANUAL = 'manual',
  DETAILS = 'details',
}

export enum HolidayTab {
  OFFICIAL = 'official',
  CUSTOM = 'custom',
}

// TODO: confirm the value the non-calendar holidays are saved with; the service only documents OFFICIAL
export enum OfficialStatus {
  OFFICIAL = 'OFFICIAL',
  UNOFFICIAL = 'UNOFFICIAL',
}

const HOLIDAY_QUERY_KEY = 'working-calendar-holiday';

export const holidayQueryKeys = {
  provinces: () => [HOLIDAY_QUERY_KEY, 'provinces'] as const,
  officialLists: () => [HOLIDAY_QUERY_KEY, 'official-list'] as const,
  officialList: (params: OfficialListParams) => [HOLIDAY_QUERY_KEY, 'official-list', params] as const,
  officialYear: (year: number) => [HOLIDAY_QUERY_KEY, 'official-year', year] as const,
  customLists: () => [HOLIDAY_QUERY_KEY, 'custom-list'] as const,
  customList: (filter: CustomListFilter) => [HOLIDAY_QUERY_KEY, 'custom-list', filter] as const,
};

export const holidayMutationKeys = {
  upload: [HOLIDAY_QUERY_KEY, 'upload'] as const,
  createOfficial: [HOLIDAY_QUERY_KEY, 'create-official'] as const,
  createCustom: [HOLIDAY_QUERY_KEY, 'create-custom'] as const,
  deleteCustom: [HOLIDAY_QUERY_KEY, 'delete-custom'] as const,
  download: [HOLIDAY_QUERY_KEY, 'download'] as const,
};
