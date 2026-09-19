import type { TablePaginationConfig } from 'antd';

import { Dayjs, dateLocale, datetimeLocale, toIsoStringWithoutTimezone } from '@branch-services/utils';

import type { PageParams } from './types';

export const JALALI_MONTHS = [
  'فروردین',
  'اردیبهشت',
  'خرداد',
  'تیر',
  'مرداد',
  'شهریور',
  'مهر',
  'آبان',
  'آذر',
  'دی',
  'بهمن',
  'اسفند',
];

export const formatCount = (value: number): string => value.toLocaleString('fa-IR');

export const monthName = (month: number): string => JALALI_MONTHS[month - 1] ?? '-';

export const weekdayName = (date: string): string => new Date(date).toLocaleDateString('fa-IR', { weekday: 'long' });

export const formatDate = (date: string): string => dateLocale(date) ?? '-';

export const formatDateWithWeekday = (date: string): string => `${formatDate(date)} - ${weekdayName(date)}`;

export const formatDateTime = (date: string): string => datetimeLocale(date, undefined, false, ' - ');

// Date picker value → api date (YYYY-MM-DD)
export const toApiDate = (date?: Dayjs | Date | null): string | undefined =>
  date ? toIsoStringWithoutTimezone(date).date : undefined;

// A holiday that has already passed can no longer be deleted
export const isPastDate = (date: string): boolean => date < (toApiDate(new Date()) as string);

// Current and next Jalali years, offered for upload and as a filter
export const getYearOptions = (): { label: string; value: number }[] => {
  const currentYear = Number(new Date().toLocaleDateString('fa-IR-u-nu-latn', { year: 'numeric' }));

  return [currentYear - 1, currentYear, currentYear + 1].map((year) => ({ label: formatCount(year), value: year }));
};

export const calculateRow = (index: number, page = 1, size = 10): number => (page - 1) * size + index + 1;

// Table change → next pagination; a new page size starts again from the first page
export const nextPagination = ({ current = 1, pageSize }: TablePaginationConfig, size: number): PageParams => {
  const nextSize = pageSize ?? size;
  return { size: nextSize, page: nextSize === size ? current : 1 };
};

// Searching the same filter again keeps the query key, so the list has to be refetched explicitly
export const isSameFilter = (next: object, current: object): boolean =>
  JSON.stringify(next) === JSON.stringify(current);
