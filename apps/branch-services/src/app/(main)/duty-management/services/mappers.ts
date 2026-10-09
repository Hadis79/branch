import { sortSlots, toHourMinute, toUnitLabel } from '../utils/utils';
import type {
  GroupOption,
  GroupResponse,
  Duty,
  DutyDto,
  DutyRequest,
  DutyResponse,
  DutySlot,
  DutySlotResponse,
  ScopeTarget,
  SelectOption,
  UnitResponse,
} from '../utils/types';

const toScopeTarget = (response: DutyResponse): ScopeTarget =>
  response.scopeType === 'UNIT'
    ? {
        type: 'UNIT',
        id: String(response.unitCode ?? ''),
        label: toUnitLabel(response.unitName ?? '', String(response.unitCode ?? '')),
      }
    : { type: 'GROUP', id: String(response.groupId ?? ''), label: response.groupName ?? '' };

// A slot as the UI keeps it: a bare date (the service may attach a time) and "HH:mm" hours (it may
// add seconds)
const toDutySlot = ({ date, startHour, endHour }: DutySlotResponse): DutySlot => ({
  date: date.slice(0, 10),
  from: toHourMinute(startHour),
  to: toHourMinute(endHour),
});

// The service may send numeric ids; the UI keeps them as strings. Slots are put in date order, which
// the expiry check and the list's chips rely on.
export const toDuty = (response: DutyResponse): Duty => ({
  id: String(response.id),
  title: response.title,
  target: toScopeTarget(response),
  affectedUnitCount: response.affectedUnitCount ?? 0,
  slots: sortSlots(response.slots.map(toDutySlot)),
});

export const toDutyRequest = (dto: DutyDto): DutyRequest => ({
  title: dto.title,
  scopeType: dto.target.type,
  groupId: dto.target.type === 'GROUP' ? dto.target.id : null,
  unitCode: dto.target.type === 'UNIT' ? dto.target.id : null,
  slots: dto.slots.map(({ date, from, to }) => ({ date, startHour: from, endHour: to })),
});

export const toGroupOption = (group: GroupResponse): GroupOption => ({
  value: String(group.id),
  label: group.name,
  unitCount: group.unitCount,
});

export const toUnitOption = (unit: UnitResponse): SelectOption => ({
  value: String(unit.code),
  label: toUnitLabel(unit.name, String(unit.code)),
});
