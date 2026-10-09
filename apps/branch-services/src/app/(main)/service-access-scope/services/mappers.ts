import { WEEK_DAYS } from '../utils/constants';
import { isWorkingDay } from '../utils/utils';
import type {
  GroupResponse,
  ScopeDay,
  ScopeDayResponse,
  ScopeTarget,
  SelectOption,
  ServiceAccessScope,
  ServiceAccessScopeDto,
  ServiceAccessScopeRequest,
  ServiceAccessScopeResponse,
  ServiceResponse,
  UnitResponse,
} from '../utils/types';

const toScopeDay = (day: ScopeDayResponse): ScopeDay => ({
  dayOfWeek: day.dayOfWeek,
  from: day.startWorkingHour,
  to: day.endWorkingHour,
});

const toScopeDayResponse = (day: ScopeDay): ScopeDayResponse => {
  const isWorking = isWorkingDay(day);

  return {
    dayOfWeek: day.dayOfWeek,
    dayName: WEEK_DAYS.find((item) => item.dayOfWeek === day.dayOfWeek)?.dayName ?? '',
    startWorkingHour: isWorking ? day.from : null,
    endWorkingHour: isWorking ? day.to : null,
  };
};

const toScopeTarget = (response: ServiceAccessScopeResponse): ScopeTarget =>
  response.scopeType === 'UNIT'
    ? { type: 'UNIT', id: response.unitCode ?? '', name: response.unitName ?? '' }
    : { type: 'GROUP', id: String(response.groupId ?? ''), name: response.groupName ?? '' };

// The service may send numeric ids; the UI keeps them as strings
export const toServiceAccessScope = (response: ServiceAccessScopeResponse): ServiceAccessScope => ({
  id: String(response.id),
  title: response.title,
  service: { id: String(response.serviceId), name: response.serviceName },
  target: toScopeTarget(response),
  affectedUnitCount: response.affectedUnitCount,
  startDate: response.startDate,
  endDate: response.endDate,
  days: response.days.map(toScopeDay),
});

export const toServiceAccessScopeRequest = (dto: ServiceAccessScopeDto): ServiceAccessScopeRequest => ({
  title: dto.title,
  serviceId: dto.service.id,
  scopeType: dto.target.type,
  groupId: dto.target.type === 'GROUP' ? dto.target.id : null,
  unitCode: dto.target.type === 'UNIT' ? dto.target.id : null,
  startDate: dto.startDate,
  endDate: dto.endDate,
  days: dto.days.map(toScopeDayResponse),
});

export const toServiceOption = (service: ServiceResponse): SelectOption => ({
  value: String(service.id),
  label: service.persianName,
});

export const toGroupOption = (group: GroupResponse): SelectOption => ({
  value: String(group.id),
  label: group.name,
});

export const toUnitOption = (unit: UnitResponse): SelectOption => ({
  value: unit.code,
  label: unit.name,
});
