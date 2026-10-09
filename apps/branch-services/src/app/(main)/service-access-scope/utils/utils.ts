import { i18nBase } from '@branch-services/translation';
import { Dayjs, dayjs, toIsoStringWithoutTimezone } from '@branch-services/utils';

import { SCOPE_TYPES, WEEK_DAYS } from './constants';
import type {
  DayOfWeek,
  PageParams,
  ScopeDay,
  ScopeFormValues,
  ScopeType,
  ServiceAccessScope,
  ServiceAccessScopeDto,
} from './types';

const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

// These are plain "HH:mm" values with no calendar date attached, so digits are mapped directly
// instead of going through a timezone-aware date formatter.
const toPersianDigits = (value: string): string => value.replace(/[0-9]/g, (digit) => PERSIAN_DIGITS[+digit]);

const isPersian = () => i18nBase.language === 'fa';

// Digits shown as written (hours, codes): "08:00" -> "۰۸:۰۰" in Persian, unchanged in English
export const formatDigits = (value: string | number): string =>
  isPersian() ? toPersianDigits(String(value)) : String(value);

export const formatHour = formatDigits;

// A count shown as text, with Persian digits in Persian
export const formatCount = (value: number): string => (isPersian() ? value.toLocaleString('fa-IR') : String(value));

type HoursRange = { from?: string | null; to?: string | null };

// Both ends of an hours range are set
export const hasHours = (range?: HoursRange): boolean => Boolean(range?.from && range.to);

// A weekday with no hours is a holiday
export const isWorkingDay = (day: ScopeDay): day is ScopeDay & { from: string; to: string } => hasHours(day);

// Translation key of a weekday's name ("SATURDAY" -> "day_saturday")
export const getDayNameKey = (dayOfWeek: DayOfWeek): string => `day_${dayOfWeek.toLowerCase()}`;

// Translation key of a scope type's name ("GROUP" -> "scope_type_group")
export const getScopeTypeKey = (type: ScopeType): string =>
  SCOPE_TYPES.find((item) => item.type === type)?.labelKey ?? '';

// Number of a table row across pages, starting from 1
export const getRowNumber = (index: number, { page, size }: PageParams): number => (page - 1) * size + index + 1;

// dayjs's day() numbering: 0 is Sunday
const DAY_OF_WEEK_BY_INDEX: DayOfWeek[] = [
  'SUNDAY',
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
];

// The weekdays a date range covers: each day of a range shorter than a week, in date order;
// otherwise (a week or longer, or no end date at all) every weekday
export const getRangeWeekDays = (startDate?: Dayjs | null, endDate?: Dayjs | null): DayOfWeek[] => {
  if (!startDate) return [];

  const dayCount = endDate ? endDate.startOf('day').diff(startDate.startOf('day'), 'day') + 1 : Infinity;
  if (dayCount >= WEEK_DAYS.length) return WEEK_DAYS.map(({ dayOfWeek }) => dayOfWeek);

  return Array.from(
    { length: Math.max(dayCount, 0) },
    (_, index) => DAY_OF_WEEK_BY_INDEX[startDate.add(index, 'day').day()]
  );
};

// Date picker value -> api date (YYYY-MM-DD)
export const toApiDate = (date?: Dayjs | Date | null): string | undefined =>
  date ? toIsoStringWithoutTimezone(date).date : undefined;

// The group or unit picked on the active tab
export const getFormTarget = (values: Partial<ScopeFormValues>) =>
  values.scopeType === 'UNIT' ? values.unit : values.group;

// The create form's values as a scope; a covered weekday left without hours is sent as a holiday
export const toServiceAccessScopeDto = (values: ScopeFormValues, weekDays: DayOfWeek[]): ServiceAccessScopeDto => {
  const target = getFormTarget(values);

  return {
    title: values.title.trim(),
    service: { id: values.service.value, name: values.service.label },
    target: { type: values.scopeType, id: target?.value ?? '', name: target?.label ?? '' },
    startDate: toApiDate(values.startDate) as string,
    endDate: toApiDate(values.endDate) ?? null,
    days: weekDays.map((dayOfWeek) => ({
      dayOfWeek,
      from: values.days?.[dayOfWeek]?.from || null,
      to: values.days?.[dayOfWeek]?.to || null,
    })),
  };
};

// A scope expires at its exact end date and time (the latest end hour among its days), not merely
// at the end of its end date. One with no end date never expires.
export const isExpiredScope = ({ endDate, days }: Pick<ServiceAccessScope, 'endDate' | 'days'>): boolean => {
  if (!endDate) return false;

  const endTime =
    days
      .filter(isWorkingDay)
      .map((day) => day.to)
      .sort()
      .pop() ?? '23:59';
  const [hour, minute, second = 0] = endTime.split(':').map(Number);
  const expiresAt = dayjs(endDate).hour(hour).minute(minute).second(second).millisecond(0);

  return expiresAt.isValid() && expiresAt.isBefore(dayjs());
};

// Active scopes first, then the expired ones (read-only)
export const splitByExpiry = (scopes: ServiceAccessScope[]) => {
  const active: ServiceAccessScope[] = [];
  const expired: ServiceAccessScope[] = [];
  scopes.forEach((scope) => (isExpiredScope(scope) ? expired : active).push(scope));
  return { active, expired };
};
