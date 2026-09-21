import type { OfficialStatus } from './constants';

export type PageParams = {
  // One-based, as shown in the table
  page: number;
  size: number;
};

// A province and the units it covers; the country-wide option is one of them
export type Province = { provinceName: string; unitCodes: string[] };

// ---- Official (calendar) holidays: uploaded per year
export type OfficialYear = { id: string; year: number; lastModified: string };

export type OfficialYearResponse = { id: string; year: number; lastModified: string };

// `month` is a jalali month name, e.g. "فروردین"
export type OfficialHoliday = { day: number; month: string; title: string };

export type OfficialListFilter = { year?: number };

export type OfficialListParams = OfficialListFilter;

export type CreateOfficialHolidaysDto = { year: number; holidays: OfficialHoliday[] };

// Raw response of the upload endpoint, normalized by services/mappers.ts.
// `rowCount` counts every row of the file, `holidays` holds the rows that are left after the duplicates
export type HolidayFileUploadResponse = { rowCount?: number; holidays?: OfficialHoliday[] };

// The response carries no file information, so the name and the type are kept from the uploaded file
export type UploadedHolidayFile = {
  fileName: string;
  fileType: string;
  holidays: OfficialHoliday[];
  dayCount: number;
  duplicateCount: number;
};

// ---- Custom (non-calendar) holidays: added one by one
// `date` is an api date (YYYY-MM-DD) and `holidayDay` its weekday, e.g. "دوشنبه"
export type NewCustomHoliday = {
  title: string;
  date: string;
  holidayDay: string;
  officialStatus: OfficialStatus;
  province: Province;
};

export type CustomHoliday = NewCustomHoliday & { id: string };

export type CustomHolidayResponse = CustomHoliday;

export type CustomListFilter = { title?: string; provinceName?: string; fromDate?: string; toDate?: string };

export type DownloadedFile = { data: Blob; type: string; fileName: string };
