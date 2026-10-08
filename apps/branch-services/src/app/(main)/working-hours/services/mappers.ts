import { DEFAULT_WORKING_HOURS_TITLE, NATIONAL_PROVINCE_NAME, WEEK_DAYS } from '../utils/constants';
import { fromJalaliDate, isWorkingDay } from '../utils/utils';
import type {
  ExceptionScope,
  WorkingDay,
  WorkingDayRequest,
  WorkingDayResponse,
  WorkingHours,
  WorkingHoursDto,
  WorkingHoursException,
  WorkingHoursExceptionDto,
  WorkingHoursExceptionRequest,
  WorkingHoursExceptionResponse,
  WorkingHoursInfoResponse,
  WorkingHoursRequest,
} from '../utils/types';

type HoursRecord = {
  startWorkingHour: string | null;
  endWorkingHour: string | null;
  days?: WorkingDayResponse[];
};

// A record saved before per-day hours has a single range, which applied to every weekday
const toWorkingDays = ({ startWorkingHour, endWorkingHour, days }: HoursRecord): WorkingDay[] =>
  days?.length
    ? days.map((day) => ({ dayOfWeek: day.dayOfWeek, from: day.startWorkingHour, to: day.endWorkingHour }))
    : WEEK_DAYS.map(({ dayOfWeek }) => ({ dayOfWeek, from: startWorkingHour, to: endWorkingHour }));

// Request endpoints accept the working range only inside each day.
const toHoursRecord = (days: WorkingDay[]): { days: WorkingDayRequest[] } => ({
  days: days.map((day) => {
    const isWorking = isWorkingDay(day);
    return {
      dayOfWeek: day.dayOfWeek,
      startWorkingHour: isWorking ? day.from : null,
      endWorkingHour: isWorking ? day.to : null,
    };
  }),
});

export const toWorkingHours = (response: WorkingHoursInfoResponse): WorkingHours => {
  const days = toWorkingDays(response);

  return {
    title: response.title,
    // Always every weekday, in WEEK_DAYS order; one the service left out is a holiday
    days: WEEK_DAYS.map(
      ({ dayOfWeek }) => days.find((day) => day.dayOfWeek === dayOfWeek) ?? { dayOfWeek, from: null, to: null }
    ),
  };
};

export const toWorkingHoursRequest = ({ days }: WorkingHoursDto): WorkingHoursRequest => ({
  title: DEFAULT_WORKING_HOURS_TITLE,
  ...toHoursRecord(days),
});

const toExceptionScope = ({ provinceName, groupId, groupName }: WorkingHoursExceptionResponse): ExceptionScope => {
  if (groupId !== null && groupId !== undefined)
    return { type: 'GROUP', groupId: String(groupId), groupName: groupName ?? '' };
  if (provinceName === NATIONAL_PROVINCE_NAME || !provinceName) return { type: 'NATIONAL' };
  return { type: 'PROVINCIAL', provinceName };
};

export const toWorkingHoursException = (response: WorkingHoursExceptionResponse): WorkingHoursException => ({
  id: String(response.id),
  title: response.title,
  scope: toExceptionScope(response),
  startDate: fromJalaliDate(response.startDate),
  endDate: response.endDate ? fromJalaliDate(response.endDate) : null,
  days: toWorkingDays(response),
});

const getRequestProvinceName = (scope: ExceptionScope): string | null => {
  if (scope.type === 'PROVINCIAL') return scope.provinceName;
  if (scope.type === 'GROUP') return null;
  return NATIONAL_PROVINCE_NAME;
};

export const toWorkingHoursExceptionRequest = (dto: WorkingHoursExceptionDto): WorkingHoursExceptionRequest => ({
  title: dto.title,
  provinceName: getRequestProvinceName(dto.scope),
  groupId: dto.scope.type === 'GROUP' ? dto.scope.groupId : null,
  startDate: dto.startDate,
  endDate: dto.endDate,
  ...toHoursRecord(dto.days),
});
