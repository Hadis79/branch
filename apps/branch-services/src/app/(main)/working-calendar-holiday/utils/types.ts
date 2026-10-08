import type { OfficialStatus } from './constants';

export type PageParams = {
  // One-based, as shown in the table
  page: number;
  size: number;
};

// A province and the units it covers; the country-wide option is one of them
export type Province = { provinceName: string; unitCodes: string[] };

// ---- Holidays of the list, also added one by one in the manual form
// `date` is an api date (YYYY-MM-DD) and `holidayDay` its weekday, e.g. "دوشنبه"
export type NewHoliday = {
  title: string;
  date: string;
  holidayDay: string;
  officialStatus: OfficialStatus;
  provinceName: string;
};

export type Holiday = NewHoliday & { id: string };

export type HolidayListFilter = {
  title?: string;
  provinceName?: string;
  officialStatus?: OfficialStatus;
  fromDate?: string;
  toDate?: string;
};

export type DeleteHolidayParams = { provinceName: string; date: string };

export type HolidayModalType = 'edit' | 'delete';

// ---- Official holidays, uploaded as a file
// The rows of the file have the same shape as the list rows
export type CreateOfficialHolidaysDto = { holidays: NewHoliday[] };

// Raw response of the upload endpoint, normalized by services/mappers.ts.
// `rowCount` counts every row of the file, `holidays` holds the rows that are left after the duplicates
export type HolidayFileUploadResponse = { rowCount?: number; holidays?: NewHoliday[] };

// The response carries no file information, so the name and the type are kept from the uploaded file
export type UploadedHolidayFile = {
  fileName: string;
  fileType: string;
  holidays: NewHoliday[];
  duplicateCount: number;
};
