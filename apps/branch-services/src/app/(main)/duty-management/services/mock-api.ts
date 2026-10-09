import type RealApi from './api';
import { toApiDate } from '../utils/utils';
import type {
  GroupResponse,
  DutyRequest,
  DutyResponse,
  DutySlotResponse,
  PageParams,
  UnitPageResponse,
  UnitResponse,
} from '../utils/types';

// In-memory backend with the same signatures as ./api, used while the real service is not ready.

const MOCK_DELAY = 600;

const UNIT_NAMES = ['برج آرمیتا', 'وزرا', 'سعادت آباد', 'شهرک غرب', 'شهرزیبا', 'ونک', 'تجریش', 'پاسداران'];

const units: UnitResponse[] = Array.from({ length: 160 }, (_, index) => ({
  name: index < UNIT_NAMES.length ? UNIT_NAMES[index] : `واحد ${index + 1}`,
  code: String(1033 + index),
}));

// Each duty group holds a slice of the units
const groups: (Omit<GroupResponse, 'unitCount'> & { unitCodes: string[] })[] = [
  { id: 1, name: 'شعب کشیک تهران', unitCodes: units.slice(0, 146).map(({ code }) => code) },
  { id: 2, name: 'گروه کشیک کیش', unitCodes: units.slice(146, 150).map(({ code }) => code) },
  { id: 3, name: 'گروه کشیک مشهد', unitCodes: units.slice(150, 160).map(({ code }) => code) },
];

const findGroup = (id: string | number | null) => groups.find((group) => String(group.id) === String(id));

// Weekly slots from a start date, `offset` days away from today
const toMockSlots = (offset: number, count = 3): DutySlotResponse[] =>
  Array.from({ length: count }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() + offset + index * 7);
    // The local date: toISOString would give the UTC one, a day early just after midnight
    return { date: toApiDate(date), startHour: '08:00', endHour: '10:00' };
  });

const groupDuty = (id: number, title: string, offset: number): DutyResponse => ({
  id,
  title,
  scopeType: 'GROUP',
  groupId: 1,
  groupName: 'شعب کشیک تهران',
  unitCode: null,
  unitName: null,
  affectedUnitCount: 146,
  slots: toMockSlots(offset),
});

let duties: DutyResponse[] = [
  groupDuty(1, 'شعب کشیک تهران - پنجشنبه بعدازظهر', 3),
  {
    id: 2,
    title: 'کشیک برج آرمیتا',
    scopeType: 'UNIT',
    groupId: null,
    groupName: null,
    unitCode: '1033',
    unitName: 'برج آرمیتا',
    affectedUnitCount: 1,
    slots: toMockSlots(5, 2),
  },
  groupDuty(3, 'شعب کشیک تهران مهر ۱۴۰۵', 10),
  groupDuty(4, 'شعب کشیک تهران مرداد ۱۴۰۵', -40),
  groupDuty(5, 'شعب کشیک تهران خرداد ۱۴۰۵', -90),
];

let lastId = duties.length;

const delay = <T>(value: T): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(structuredClone(value)), MOCK_DELAY));

const MockApi: typeof RealApi = {
  getDuties: () => delay(duties),

  createDuty: (payload: DutyRequest) => {
    const group = findGroup(payload.groupId);
    const unit = units.find(({ code }) => code === payload.unitCode);
    const duty: DutyResponse = {
      ...payload,
      id: ++lastId,
      groupName: group?.name ?? null,
      unitName: unit?.name ?? null,
      affectedUnitCount: payload.scopeType === 'GROUP' ? group?.unitCodes.length ?? 0 : 1,
    };
    duties = [duty, ...duties];
    return delay(duty);
  },

  deleteDuty: (id: string) => {
    duties = duties.filter((duty) => String(duty.id) !== id);
    return delay(undefined);
  },

  getGroups: () => delay(groups.map(({ id, name, unitCodes }) => ({ id, name, unitCount: unitCodes.length }))),

  getUnits: () => delay(units),

  getGroupUnits: (groupId: string, { page, size }: PageParams): Promise<UnitPageResponse> => {
    const codes = new Set(findGroup(groupId)?.unitCodes);
    const groupUnits = units.filter(({ code }) => codes.has(code));
    const totalPages = Math.ceil(groupUnits.length / size);

    return delay({
      content: groupUnits.slice((page - 1) * size, page * size),
      totalElements: groupUnits.length,
      totalPages,
      size,
      number: page - 1,
      first: page === 1,
      last: page >= totalPages,
    } as UnitPageResponse);
  },
};

export default MockApi;
