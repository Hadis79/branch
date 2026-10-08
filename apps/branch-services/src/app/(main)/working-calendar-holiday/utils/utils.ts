import type { TablePaginationConfig } from 'antd';

import { Dayjs, dateLocale, toIsoStringWithoutTimezone } from '@branch-services/utils';

import type { NewHoliday, PageParams } from './types';

export const formatCount = (value: number): string => value.toLocaleString('fa-IR');

export const weekdayName = (date: string): string => new Date(date).toLocaleDateString('fa-IR', { weekday: 'long' });

export const formatDate = (date: string): string => dateLocale(date) ?? '-';

export const formatDateWithWeekday = (date: string): string => `${formatDate(date)} - ${weekdayName(date)}`;

// Date picker value → api date (YYYY-MM-DD)
export const toApiDate = (date?: Dayjs | Date | null): string | undefined =>
  date ? toIsoStringWithoutTimezone(date).date : undefined;

// Two holidays are the same when they fall on the same date in the same region
export const isSameHoliday = (a: NewHoliday, b: NewHoliday): boolean =>
  a.date === b.date && a.provinceName === b.provinceName;

// A holiday that has already passed can no longer be edited or deleted
export const isPastDate = (date: string): boolean => date < (toApiDate(new Date()) as string);

// e.g. "holidays_1405.xlsx" -> "holidays_1405"
export const withoutExtension = (fileName: string): string => fileName.replace(/\.[^.]+$/, '');

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
