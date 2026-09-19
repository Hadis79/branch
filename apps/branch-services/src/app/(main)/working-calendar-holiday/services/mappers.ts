import type { PaginatedData } from '@branch-services/types';

import type { HolidayFileUploadResponse, UploadedHolidayFile } from '../utils/types';

// The service may send numeric ids; the UI keeps them as strings
export const toStringIds = <T extends { id: string | number }>(
  response: PaginatedData<T>
): PaginatedData<Omit<T, 'id'> & { id: string }> => ({
  ...response,
  content: response.content.map((item) => ({ ...item, id: String(item.id) })),
});

// `success: false` is turned into a rejection so callers only handle the error path once
export const toUploadedHolidayFile = (response: HolidayFileUploadResponse): UploadedHolidayFile => {
  if (response.success === false) throw new Error('Holiday file upload failed');

  const holidays = response.holidays ?? [];

  return {
    fileName: response.fileName,
    fileType: response.fileType,
    holidays,
    dayCount: holidays.length,
    duplicateCount: response.duplicateCount ?? 0,
  };
};
