export type WorkingHours = {
  title: string;
  from: string; // "HH:mm"
  to: string; // "HH:mm"
};

export type WorkingHoursDto = {
  from: string;
  to: string;
};

// Raw shape of GET work-time/default/info
export type WorkingHoursInfoResponse = {
  id: number;
  title: string;
  startWorkingHour: string;
  endWorkingHour: string;
};

// Raw shape sent to POST work-time/default
export type WorkingHoursRequest = {
  title: string;
  startWorkingHour: string;
  endWorkingHour: string;
};

// A scope covering every province, or a single named one
export type ExceptionScope = { type: 'NATIONAL' } | { type: 'PROVINCIAL'; provinceName: string };

export type WorkingHoursException = {
  id: string;
  title: string;
  scope: ExceptionScope;
  startDate: string; // api date (YYYY-MM-DD)
  endDate: string;
  from: string; // "HH:mm"
  to: string;
};

export type WorkingHoursExceptionDto = Omit<WorkingHoursException, 'id'>;

// Raw shape of GET work-time/exception/list. There is no separate scope-type field: a "national"
// exception is just the sentinel province name (NATIONAL_PROVINCE_NAME). The dates are Jalali
// ("YYYY/MM/DD"), unlike the ISO dates the create endpoint takes.
export type WorkingHoursExceptionResponse = {
  id: number;
  title: string;
  provinceName: string;
  startDate: string;
  endDate: string;
  startWorkingHour: string;
  endWorkingHour: string;
};

// Raw shape sent to POST work-time/exception/create. Same fields as the response, but startDate /
// endDate are ISO (YYYY-MM-DD) here and there is no id.
export type WorkingHoursExceptionRequest = Omit<WorkingHoursExceptionResponse, 'id'>;

// Raw shape of GET calendar/holiday/province/list (shared with working-calendar-holiday). A
// nationwide entry has no unit codes of its own; the exception form filters it out since scope
// already has its own "national" option.
export type ProvinceResponse = { provinceName: string; unitCodes: string[] };
