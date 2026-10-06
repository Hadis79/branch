import type { DayOfWeek } from './types';

// Set to true to switch every request back to the mock service (services/mock-api.ts). Confirmed
// endpoints: getWorkingHours (GET work-time/default/info), getExceptions/createException/deleteException
// (work-time/exception/...). createWorkingHours/updateWorkingHours (the default hours) are still guesses.
export const USE_MOCK_API = true;

export const WORKING_HOURS_PATH = '/working-hours';

// Fixed, not user-editable; sent as-is on every create/update request
export const DEFAULT_WORKING_HOURS_TITLE = 'ساعت کاری پیش‌فرض بانک ملی ایران';

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

// The provinceName the exceptions service uses for a nationwide (every-province) exception
export const NATIONAL_PROVINCE_NAME = 'کشوری';

// Values are part of the URL (`?step=`) and are shown by the breadcrumb (translation keys)
export enum WorkingHoursPage {
  LIST = 'list',
  CREATE = 'define-default',
  EDIT = 'edit-default',
  ADD_EXCEPTION = 'add-exception',
}

// Mock seed only; the real provinces come from getProvinces (calendar/holiday/province/list)
export const PROVINCE_NAMES = ['اصفهان', 'تهران', 'خوزستان', 'قم', 'قزوین', 'فارس', 'خراسان رضوی', 'آذربایجان شرقی'];

const WORKING_HOURS_QUERY_KEY = 'working-hours';

export const workingHoursQueryKeys = {
  default: () => [WORKING_HOURS_QUERY_KEY, 'default'] as const,
  exceptions: () => [WORKING_HOURS_QUERY_KEY, 'exceptions'] as const,
  provinces: () => [WORKING_HOURS_QUERY_KEY, 'provinces'] as const,
  groups: () => [WORKING_HOURS_QUERY_KEY, 'groups'] as const,
};

export const workingHoursMutationKeys = {
  create: [WORKING_HOURS_QUERY_KEY, 'create'] as const,
  update: [WORKING_HOURS_QUERY_KEY, 'update'] as const,
  createException: [WORKING_HOURS_QUERY_KEY, 'create-exception'] as const,
  deleteException: [WORKING_HOURS_QUERY_KEY, 'delete-exception'] as const,
};
