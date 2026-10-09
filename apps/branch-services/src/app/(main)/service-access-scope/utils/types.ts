import type { PaginatedData } from '@branch-services/types';
import type { Dayjs } from '@branch-services/utils';

export type DayOfWeek = 'SATURDAY' | 'SUNDAY' | 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY';

// What a scope applies to: every unit of a working-hours group, or a single unit
export type ScopeType = 'GROUP' | 'UNIT';

// One weekday's hours ("HH:mm"); a day with no hours is a holiday for the scope's service
export type ScopeDay = {
  dayOfWeek: DayOfWeek;
  from: string | null;
  to: string | null;
};

// A picked option; for a unit, id is its code
export type NamedItem = {
  id: string;
  name: string;
};

export type ScopeTarget = NamedItem & { type: ScopeType };

export type ServiceAccessScope = {
  id: string;
  title: string;
  service: NamedItem;
  target: ScopeTarget;
  affectedUnitCount: number;
  startDate: string; // api date (YYYY-MM-DD)
  endDate: string | null; // null: no end, applies until the scope is deleted
  days: ScopeDay[]; // only the weekdays the scope's range covers, in the order they were defined
};

export type ServiceAccessScopeDto = Omit<ServiceAccessScope, 'id' | 'affectedUnitCount'>;

export type SelectOption = { value: string; label: string };

// Values of the create form's fields (antd Form)
export type ScopeFormValues = {
  // labelInValue keeps each pick's name alongside its id, for the preview
  service: SelectOption;
  scopeType: ScopeType;
  // Both are kept while switching tabs; only the active tab's one is used
  group?: SelectOption;
  unit?: SelectOption;
  title: string;
  startDate: Dayjs;
  endDate?: Dayjs | null;
  // Keyed by weekday, so hours already entered survive a change of the date range
  days?: Partial<Record<DayOfWeek, { from?: string | null; to?: string | null }>>;
};

// The create page's state, kept while the affected units page is open
export type ScopeFormDraft = {
  values: ScopeFormValues;
  preview: ServiceAccessScopeDto;
};

export type PageParams = {
  // One-based, as shown in the table
  page: number;
  size: number;
};

// One weekday as the scope endpoints send and receive it
export type ScopeDayResponse = {
  dayOfWeek: DayOfWeek;
  dayName: string;
  startWorkingHour: string | null;
  endWorkingHour: string | null;
};

// Raw shape of GET calendar/service-scope/list (not confirmed yet)
export type ServiceAccessScopeResponse = {
  id: string | number;
  title: string;
  serviceId: string | number;
  serviceName: string;
  scopeType: ScopeType;
  groupId: string | number | null;
  groupName: string | null;
  unitCode: string | null;
  unitName: string | null;
  affectedUnitCount: number;
  startDate: string;
  endDate: string | null;
  days: ScopeDayResponse[];
};

// Raw shape sent to POST calendar/service-scope/create (not confirmed yet)
export type ServiceAccessScopeRequest = Pick<
  ServiceAccessScopeResponse,
  'title' | 'serviceId' | 'scopeType' | 'groupId' | 'unitCode' | 'startDate' | 'endDate' | 'days'
>;

// Raw row of GET calendar/service/list (shared with working-calendar-services)
export type ServiceResponse = {
  id: string | number;
  persianName: string;
  englishName: string;
  active: boolean;
};

export type ServiceListResponse = {
  content: ServiceResponse[];
};

// Raw row of GET calendar/group/work-time-list (shared with working-hours)
export type GroupResponse = {
  id: string | number;
  name: string;
};

// Raw row of GET calendar/unit-list and of a group's unit pages (shared with working-calendar-groups)
export type UnitResponse = {
  name: string;
  code: string;
};

export type UnitPageResponse = PaginatedData<UnitResponse>;
