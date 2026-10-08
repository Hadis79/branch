import { Dayjs, dayjs } from '@branch-services/utils';

import type { OfficialStatus } from './constants';
import type { HolidayListFilter } from './types';
import { toApiDate } from './utils';

// Values of the list filter form; `''` stands for "all types" and is dropped before being sent
export type HolidayFilterValues = {
  title?: string;
  fromDate?: Dayjs;
  toDate?: Dayjs;
  provinceName?: string;
  officialStatus?: OfficialStatus | '';
};

const ParamUtil = {
  // Filter form -> list request
  holidayList: (values: HolidayFilterValues): HolidayListFilter => ({
    title: values.title?.trim() || undefined,
    fromDate: toApiDate(values.fromDate),
    toDate: toApiDate(values.toDate),
    provinceName: values.provinceName || undefined,
    officialStatus: values.officialStatus || undefined,
  }),
  // Applied filter -> filter form, e.g. when the list is opened again
  holidayFilterForm: ({ fromDate, toDate, officialStatus, ...filter }: HolidayListFilter): HolidayFilterValues => ({
    ...filter,
    officialStatus: officialStatus ?? '',
    fromDate: fromDate ? dayjs(fromDate) : undefined,
    toDate: toDate ? dayjs(toDate) : undefined,
  }),
};

export default ParamUtil;
