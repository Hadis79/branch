import { i18nBase } from '@branch-services/translation';
import { Dayjs, dayjs, toIsoStringWithoutTimezone } from '@branch-services/utils';

import { WEEK_DAYS } from './constants';
import type { DayOfWeek, RuleDay, RuleFormValues, ServiceRule, ServiceRuleDto } from './types';

const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

// These are plain "HH:mm" values with no calendar date attached, so digits are mapped directly
// instead of going through a timezone-aware date formatter.
const toPersianDigits = (value: string): string => value.replace(/[0-9]/g, (digit) => PERSIAN_DIGITS[+digit]);

// A saved hour shown as text: "08:00" -> "۰۸:۰۰" in Persian, unchanged in English
export const formatHour = (value: string): string => (i18nBase.language === 'fa' ? toPersianDigits(value) : value);

type HoursRange = { from?: string | null; to?: string | null };

// Both ends of an hours range are set
export const hasHours = (range?: HoursRange): boolean => Boolean(range?.from && range.to);

// A weekday with no hours is a holiday
export const isWorkingDay = (day: RuleDay): day is RuleDay & { from: string; to: string } => hasHours(day);

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

// Date picker value -> api date (YYYY-MM-DD)
export const toApiDate = (date?: Dayjs | Date | null): string | undefined =>
  date ? toIsoStringWithoutTimezone(date).date : undefined;

// The create form's values as a rule; a covered weekday left without hours is sent as a holiday
export const toServiceRuleDto = (values: RuleFormValues, weekDays: DayOfWeek[]): ServiceRuleDto => ({
  title: values.title.trim(),
  service: { id: values.service.value, name: values.service.label },
  startDate: toApiDate(values.startDate) as string,
  endDate: toApiDate(values.endDate) ?? null,
  days: weekDays.map((dayOfWeek) => ({
    dayOfWeek,
    from: values.days?.[dayOfWeek]?.from || null,
    to: values.days?.[dayOfWeek]?.to || null,
  })),
});

// A rule expires at its exact end date and time (the latest end hour among its days), not merely
// at the end of its end date. One with no end date never expires.
export const isExpiredRule = ({ endDate, days }: Pick<ServiceRule, 'endDate' | 'days'>): boolean => {
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
