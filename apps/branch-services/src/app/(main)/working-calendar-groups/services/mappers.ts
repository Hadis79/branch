import type { GroupFileUploadResponse, UploadedGroupFile } from '../utils/types';

// The upload endpoint reports the unit count under different fields; the UI only sees `unitCount`.
// `success: false` is turned into a rejection so callers only handle the error path once.
export const toUploadedGroupFile = (response: GroupFileUploadResponse): UploadedGroupFile => {
  if (response.success === false) throw new Error('Group file upload failed');

  const units = response.units ?? [];

  return {
    fileName: response.fileName,
    units,
    unitCount: response.unitCount ?? response.totalRecords ?? response.size ?? units.length,
  };
};
