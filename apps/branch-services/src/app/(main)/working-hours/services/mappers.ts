import { DEFAULT_WORKING_HOURS_TITLE, NATIONAL_PROVINCE_NAME } from '../utils/constants';
import { fromJalaliDate } from '../utils/utils';
import type {
  WorkingHours,
  WorkingHoursDto,
  WorkingHoursException,
  WorkingHoursExceptionDto,
  WorkingHoursExceptionRequest,
  WorkingHoursExceptionResponse,
  WorkingHoursInfoResponse,
  WorkingHoursRequest,
} from '../utils/types';

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

export const toWorkingHoursException = (response: WorkingHoursExceptionResponse): WorkingHoursException => ({
  id: String(response.id),
  title: response.title,
  scope:
    response.provinceName === NATIONAL_PROVINCE_NAME
      ? { type: 'NATIONAL' }
      : { type: 'PROVINCIAL', provinceName: response.provinceName },
  startDate: fromJalaliDate(response.startDate),
  endDate: fromJalaliDate(response.endDate),
  from: response.startWorkingHour,
  to: response.endWorkingHour,
});

export const toWorkingHoursExceptionRequest = (dto: WorkingHoursExceptionDto): WorkingHoursExceptionRequest => ({
  title: dto.title,
  provinceName: dto.scope.type === 'PROVINCIAL' ? dto.scope.provinceName : NATIONAL_PROVINCE_NAME,
  startDate: dto.startDate,
  endDate: dto.endDate,
  startWorkingHour: dto.from,
  endWorkingHour: dto.to,
});
