import type { Dayjs } from '@branch-services/utils';

export type DayOfWeek = 'SATURDAY' | 'SUNDAY' | 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY';

// One weekday's hours ("HH:mm"); a day with no hours is a holiday for the rule's service
export type RuleDay = {
  dayOfWeek: DayOfWeek;
  from: string | null;
  to: string | null;
};

export type RuleService = {
  id: string;
  name: string;
};

export type ServiceRule = {
  id: string;
  title: string;
  service: RuleService;
  startDate: string; // api date (YYYY-MM-DD)
  endDate: string | null; // null: no end, applies until the rule is deleted
  days: RuleDay[]; // only the weekdays the rule's range covers, in the order they were defined
};

export type ServiceRuleDto = Omit<ServiceRule, 'id'>;

// Values of the create form's fields (antd Form)
export type RuleFormValues = {
  // labelInValue keeps the service's name alongside its id, for the preview
  service: { value: string; label: string };
  title: string;
  startDate: Dayjs;
  endDate?: Dayjs | null;
  // Keyed by weekday, so hours already entered survive a change of the date range
  days?: Partial<Record<DayOfWeek, { from?: string | null; to?: string | null }>>;
};

// One weekday as the rule endpoints send and receive it
export type RuleDayResponse = {
  dayOfWeek: DayOfWeek;
  dayName: string;
  startWorkingHour: string | null;
  endWorkingHour: string | null;
};

// Raw shape of GET calendar/rule/list (not confirmed yet)
export type ServiceRuleResponse = {
  id: string | number;
  title: string;
  serviceId: string | number;
  serviceName: string;
  startDate: string;
  endDate: string | null;
  days: RuleDayResponse[];
};

// Raw shape sent to POST calendar/rule/create (not confirmed yet)
export type ServiceRuleRequest = Omit<ServiceRuleResponse, 'id' | 'serviceName'>;

// Raw row of GET calendar/service/list (shared with working-calendar-services)
export type ServiceResponse = {
  id: string | number;
  persianName: string;
  englishName: string;
  active: boolean;
  overridable: boolean;
};

export type ServiceListResponse = {
  content: ServiceResponse[];
};
