import type { WorkingHours, WorkingHoursInfoResponse } from '../utils/types';

export const toWorkingHours = (response: WorkingHoursInfoResponse): WorkingHours => ({
  title: response.title,
  from: response.startWorkingHour,
  to: response.endWorkingHour,
});
