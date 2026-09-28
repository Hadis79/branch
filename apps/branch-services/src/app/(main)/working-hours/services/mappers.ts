import { DEFAULT_WORKING_HOURS_TITLE } from '../utils/constants';
import type { WorkingHours, WorkingHoursDto, WorkingHoursInfoResponse, WorkingHoursRequest } from '../utils/types';

export const toWorkingHours = (response: WorkingHoursInfoResponse): WorkingHours => ({
  title: response.title,
  from: response.startWorkingHour,
  to: response.endWorkingHour,
});

export const toWorkingHoursRequest = ({ from, to }: WorkingHoursDto): WorkingHoursRequest => ({
  title: DEFAULT_WORKING_HOURS_TITLE,
  startWorkingHour: from,
  endWorkingHour: to,
});
