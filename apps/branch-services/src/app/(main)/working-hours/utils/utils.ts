import { i18nBase } from '@branch-services/translation';
import { Dayjs, dayjs, toIsoStringWithoutTimezone } from '@branch-services/utils';

import { WEEK_DAYS } from './constants';
import type { DayOfWeek, ExceptionScope, WorkingDay } from './types';

const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

// These are plain "HH:mm" values with no calendar date attached, so digits are mapped directly
// instead of going through a timezone-aware date formatter.
const toPersianDigits = (value: string): string => value?.replace(/[0-9]/g, (digit) => PERSIAN_DIGITS[+digit]);

// A saved hour shown as text: "06:00" -> "۰۶:۰۰" in Persian, unchanged in English
export const formatHour = (value: string): string => (i18nBase.language === 'fa' ? toPersianDigits(value) : value);

// How an exception's scope reads in its preview and card
export const getScopeText = (scope: ExceptionScope, t: (key: string) => string): string => {
  if (scope.type === 'PROVINCIAL') return `${t('scope_provincial')} - ${t('province_prefix')} ${scope.provinceName}`;
  if (scope.type === 'GROUP') return `${t('scope_group')} - ${scope.groupName}`;
  return t('scope_national');
};

// A weekday with no hours is a holiday
export const isWorkingDay = (day: WorkingDay): day is WorkingDay & { from: string; to: string } =>
  Boolean(day.from && day.to);

// Translation key of a weekday's name ("SATURDAY" -> "day_saturday")
export const getDayNameKey = (dayOfWeek: DayOfWeek): string => `day_${dayOfWeek.toLowerCase()}`;

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

// Inclusive day count of an exception's date range, shown in its preview
export const getDayCount = (startDate: string, endDate: string): number =>
  dayjs(endDate).diff(dayjs(startDate), 'day') + 1;

// Date picker value -> api date (YYYY-MM-DD)
export const toApiDate = (date?: Dayjs | Date | null): string | undefined =>
  date ? toIsoStringWithoutTimezone(date).date : undefined;

// The exceptions list returns Jalali dates ("1405/03/31"), unlike the ISO dates it's created
// with; parsed explicitly as Jalali so this doesn't depend on the app's current calendar mode.
export const fromJalaliDate = (value: string): string =>
  toApiDate(dayjs(value.replace(/\//g, '-'), { jalali: true })) as string;

// An exception expires at its exact end date and time (the latest end hour among its days), not
// merely at the end of its end date. One with no end date never expires.
export const isExpiredException = (endDate: string | null, days: WorkingDay[]): boolean => {
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
