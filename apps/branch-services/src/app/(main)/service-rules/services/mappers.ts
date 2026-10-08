import { WEEK_DAYS } from '../utils/constants';
import { isWorkingDay } from '../utils/utils';
import type {
  RuleDay,
  RuleDayResponse,
  ServiceResponse,
  ServiceRule,
  ServiceRuleDto,
  ServiceRuleRequest,
  ServiceRuleResponse,
} from '../utils/types';

const toRuleDay = (day: RuleDayResponse): RuleDay => ({
  dayOfWeek: day.dayOfWeek,
  from: day.startWorkingHour,
  to: day.endWorkingHour,
});

const toRuleDayResponse = (day: RuleDay): RuleDayResponse => {
  const isWorking = isWorkingDay(day);

  return {
    dayOfWeek: day.dayOfWeek,
    dayName: WEEK_DAYS.find((item) => item.dayOfWeek === day.dayOfWeek)?.dayName ?? '',
    startWorkingHour: isWorking ? day.from : null,
    endWorkingHour: isWorking ? day.to : null,
  };
};

// The service may send numeric ids; the UI keeps them as strings
export const toServiceRule = (response: ServiceRuleResponse): ServiceRule => ({
  id: String(response.id),
  title: response.title,
  service: { id: String(response.serviceId), name: response.serviceName },
  startDate: response.startDate,
  endDate: response.endDate,
  days: response.days.map(toRuleDay),
});

export const toServiceRuleRequest = (dto: ServiceRuleDto): ServiceRuleRequest => ({
  title: dto.title,
  serviceId: dto.service.id,
  startDate: dto.startDate,
  endDate: dto.endDate,
  days: dto.days.map(toRuleDayResponse),
});

export const toServiceOption = (service: ServiceResponse) => ({
  value: String(service.id),
  label: service.persianName,
});
