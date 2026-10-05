import type { TablePaginationConfig } from 'antd';

import { Dayjs, dateLocale, datetimeLocale, dayjs, toIsoStringWithoutTimezone } from '@branch-services/utils';

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

// A year isn't grouped, unlike a count (e.g. 1404, not 1,404)
export const formatYear = (year: number): string => year.toLocaleString('fa-IR', { useGrouping: false });

export const weekdayName = (date: string): string => new Date(date).toLocaleDateString('fa-IR', { weekday: 'long' });

export const formatDate = (date: string): string => dateLocale(date) ?? '-';

export const formatDateWithWeekday = (date: string): string => `${formatDate(date)} - ${weekdayName(date)}`;

export const formatDateTime = (date?: string | null): string =>
  date ? datetimeLocale(date, undefined, false, ' - ') : '-';

// Date picker value → api date (YYYY-MM-DD)
export const toApiDate = (date?: Dayjs | Date | null): string | undefined =>
  date ? toIsoStringWithoutTimezone(date).date : undefined;

// A holiday that has already passed can no longer be deleted
export const isPastDate = (date: string): boolean => date < (toApiDate(new Date()) as string);

// Current Jalali year and the previous 9 years, used by the list filter
export const getYearOptions = (): { label: string; value: number }[] => {
  const currentJalaliYear = dayjs().year();

  return Array.from({ length: 10 }, (_, index) => currentJalaliYear - index).map((jalaliYear) => ({
    label: String(jalaliYear),
    value: Number(jalaliYear),
  }));
};

// Current Jalali year and the next 9 years, used when creating an official holiday calendar
export const getFutureYearOptions = (): { label: string; value: number }[] => {
  const currentJalaliYear = dayjs().year();

  return Array.from({ length: 10 }, (_, index) => currentJalaliYear + index).map((jalaliYear) => ({
    label: String(jalaliYear),
    value: Number(jalaliYear),
  }));
};

// Convert a Gregorian year received from the service to its Jalali display year
export const toJalaliYear = (gregorianYear: number): number => {
  const date = new Date();
  date.setFullYear(gregorianYear);
  return dayjs(date).year();
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

const Utils = {
  getLocalFile: (fileName = '') => {
    const url = `/embedded/CALENDAR_HOLIDAY_CREATION.xlsx`;

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    link.setAttribute('rel', 'noopener noreferrer');
    link.setAttribute('target', '_blank');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },
};
export default Utils;
