export type DayOfWeek = 'SATURDAY' | 'SUNDAY' | 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY';

// One weekday's hours; a day with no hours ("HH:mm") is a holiday
export type WorkingDay = {
  dayOfWeek: DayOfWeek;
  from: string | null;
  to: string | null;
};

export type WorkingHours = {
  title: string;
  days: WorkingDay[]; // always every weekday, in WEEK_DAYS order
};

export type WorkingHoursDto = {
  days: WorkingDay[];
};

// One weekday as the default-hours endpoints send and receive it
export type WorkingDayResponse = {
  dayOfWeek: DayOfWeek;
  dayName: string;
  startWorkingHour: string | null;
  endWorkingHour: string | null;
};

// Raw shape of GET work-time/default/info. `days` is missing on records saved before per-day hours.
export type WorkingHoursInfoResponse = {
  id: number;
  title: string;
  startWorkingHour: string | null;
  endWorkingHour: string | null;
  days?: WorkingDayResponse[];
};

// Raw shape sent to POST work-time/default. startWorkingHour / endWorkingHour still go along with
// the per-day hours: the earliest start and latest end among the working days.
export type WorkingHoursRequest = {
  title: string;
  startWorkingHour: string | null;
  endWorkingHour: string | null;
  days: WorkingDayResponse[];
};

// A scope covering every province, a single named one, or one working-hours group of units
export type ExceptionScope =
  | { type: 'NATIONAL' }
  | { type: 'PROVINCIAL'; provinceName: string }
  | { type: 'GROUP'; groupId: string; groupName: string };

export type WorkingHoursException = {
  id: string;
  title: string;
  scope: ExceptionScope;
  startDate: string; // api date (YYYY-MM-DD)
  endDate: string | null; // null: no end, applies until the exception is deleted
  days: WorkingDay[]; // only the weekdays the exception covers, in the order they were defined
};

export type WorkingHoursExceptionDto = Omit<WorkingHoursException, 'id'>;

// Raw shape of GET work-time/exception/list. There is no separate scope-type field: a "national"
// exception is just the sentinel province name (NATIONAL_PROVINCE_NAME). The dates are Jalali
// ("YYYY/MM/DD"), unlike the ISO dates the create endpoint takes. `days` holds only the weekdays
// the exception covers, and is missing on exceptions saved before per-day hours.
export type WorkingHoursExceptionResponse = {
  id: number;
  title: string;
  provinceName: string | null; // null for a group-scoped exception
  groupId?: string | number | null;
  groupName?: string | null;
  startDate: string;
  endDate: string | null;
  startWorkingHour: string | null;
  endWorkingHour: string | null;
  days?: WorkingDayResponse[];
};

// Raw shape sent to POST work-time/exception/create. Same fields as the response, but startDate /
// endDate are ISO (YYYY-MM-DD) here and there is no id. startWorkingHour / endWorkingHour are the
// earliest start and latest end among the working days, like the default hours' request.
// A group-scoped exception sends its groupId and no provinceName.
export type WorkingHoursExceptionRequest = Omit<
  WorkingHoursExceptionResponse,
  'id' | 'days' | 'groupId' | 'groupName'
> & {
  groupId: string | null;
  days: WorkingDayResponse[];
};

// Raw shape of GET calendar/holiday/province/list (shared with working-calendar-holiday). A
// nationwide entry has no unit codes of its own; the exception form filters it out since scope
// already has its own "national" option.
export type ProvinceResponse = { provinceName: string; unitCodes: string[] };

// Raw shape of one GET calendar/group/work-time-list item
export type GroupResponse = { id: string | number; name: string; size: number; groupType: string };
