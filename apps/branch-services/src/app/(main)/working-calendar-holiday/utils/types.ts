export type PageParams = {
  // One-based, as shown in the table
  page: number;
  size: number;
};

export type Region = { code: string; name: string };

// ---- Official (calendar) holidays: uploaded per year
export type OfficialYear = { id: string; year: number; lastModified: string };

export type OfficialYearResponse = Omit<OfficialYear, 'id'> & { id: string | number };

export type OfficialHoliday = { day: number; month: number; title: string };

export type OfficialListFilter = { year?: number };

export type OfficialListParams = PageParams & OfficialListFilter;

export type CreateOfficialHolidaysDto = { year: number; holidays: OfficialHoliday[] };

// Raw response of the upload endpoint, normalized by services/mappers.ts
export type HolidayFileUploadResponse = {
  success?: boolean;
  fileName?: string;
  fileType?: string;
  holidays?: OfficialHoliday[];
  duplicateCount?: number;
};

export type UploadedHolidayFile = {
  fileName?: string;
  fileType?: string;
  holidays: OfficialHoliday[];
  dayCount: number;
  duplicateCount: number;
};

// ---- Custom (non-calendar) holidays: added one by one
export type CustomHoliday = { id: string; date: string; title: string; region: Region };

export type CustomHolidayResponse = Omit<CustomHoliday, 'id'> & { id: string | number };

// `date` is an api date (YYYY-MM-DD)
export type NewCustomHoliday = { title: string; regionCode: string; date: string };

export type CustomListFilter = { title?: string; regionCode?: string; fromDate?: string; toDate?: string };

export type CustomListParams = PageParams & CustomListFilter;

export type DownloadedFile = { data: Blob; type: string; fileName: string };
