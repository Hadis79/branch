import type { PaginatedData } from '@branch-services/types';
import type { Dayjs } from '@branch-services/utils';

// What a duty applies to: every unit of a duty group, or a single unit
export type ScopeType = 'GROUP' | 'UNIT';

// The group or unit a duty applies to; for a unit, id is its code and the label carries the code too
export type ScopeTarget = {
  type: ScopeType;
  id: string;
  label: string;
};

// One duty day and its hours ("HH:mm")
export type DutySlot = {
  date: string; // api date (YYYY-MM-DD)
  from: string;
  to: string;
};

export type Duty = {
  id: string;
  title: string;
  target: ScopeTarget;
  affectedUnitCount: number;
  slots: DutySlot[]; // in date and hour order
};

export type DutyDto = Omit<Duty, 'id' | 'affectedUnitCount'>;

export type SelectOption = { value: string; label: string };

export type GroupOption = SelectOption & { unitCount: number };

// Values of the create form's fields (antd Form)
export type DutyFormValues = {
  scopeType: ScopeType;
  // labelInValue keeps each pick's name alongside its id, for the preview. Both are kept while
  // switching tabs; only the active tab's one is used
  group?: SelectOption;
  unit?: SelectOption;
  title: string;
  slots: DutySlot[];
};

// Values of the add-slot modal's fields
export type SlotFormValues = {
  date: Dayjs;
  from?: string | null;
  to?: string | null;
};

// The create page's state, kept while the affected units page is open
export type DutyFormDraft = {
  values: DutyFormValues;
  preview: DutyDto;
};

export type PageParams = {
  // One-based, as shown in the table
  page: number;
  size: number;
};

// One duty day as the duty endpoints send and receive it
export type DutySlotResponse = {
  date: string;
  startHour: string;
  endHour: string;
};

// Raw shape of GET calendar/duty/list (not confirmed yet)
export type DutyResponse = {
  id: string | number;
  title: string;
  scopeType: ScopeType;
  groupId: string | number | null;
  groupName: string | null;
  unitCode: string | null;
  unitName: string | null;
  affectedUnitCount: number;
  slots: DutySlotResponse[];
};

// Raw shape sent to POST calendar/duty/create (not confirmed yet)
export type DutyRequest = Pick<DutyResponse, 'title' | 'scopeType' | 'groupId' | 'unitCode' | 'slots'>;

// Raw row of GET calendar/group/duty-list: only the groups of the duty type (not confirmed yet)
export type GroupResponse = {
  id: string | number;
  name: string;
  unitCount: number;
};

// Raw row of GET calendar/unit-list and of a group's unit pages (shared with working-calendar-groups)
export type UnitResponse = {
  name: string;
  code: string;
};

export type UnitPageResponse = PaginatedData<UnitResponse>;
