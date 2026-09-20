import type { PaginatedData } from '@branch-services/types';

import type { HolidayFileUploadResponse, UploadedHolidayFile } from '../utils/types';

// The service may send numeric ids; the UI keeps them as strings
export const toStringIds = <T extends { id: string | number }>(
  response: PaginatedData<T>
): PaginatedData<Omit<T, 'id'> & { id: string }> => ({
  ...response,
  content: response.content.map((item) => ({ ...item, id: String(item.id) })),
});

// e.g. "holidays-1405.xlsx" -> "Xlsx"
const getFileType = (fileName: string) =>
  (fileName.split('.').pop() ?? '').replace(/^./, (letter) => letter.toUpperCase());

// The uploaded file is passed in because the response repeats neither its name nor its type.
// Duplicate rows are the rows of the file that are missing from the returned holidays
export const toUploadedHolidayFile = (response: HolidayFileUploadResponse, file: File): UploadedHolidayFile => {
  const holidays = response.holidays ?? [];

  return {
    fileName: file.name,
    fileType: getFileType(file.name),
    holidays,
    dayCount: holidays.length,
    duplicateCount: Math.max((response.rowCount ?? holidays.length) - holidays.length, 0),
  };
};
