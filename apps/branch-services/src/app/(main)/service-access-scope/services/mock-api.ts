import type RealApi from './api';
import { WEEK_DAYS } from '../utils/constants';
import type {
  GroupResponse,
  PageParams,
  ScopeDayResponse,
  ServiceAccessScopeRequest,
  ServiceAccessScopeResponse,
  ServiceListResponse,
  ServiceResponse,
  UnitPageResponse,
  UnitResponse,
} from '../utils/types';

// In-memory backend with the same signatures as ./api, used while the real service is not ready.

const MOCK_DELAY = 600;

const services: ServiceResponse[] = [
  ['واریز گروهی آفلاین ACH', 'Offline batch ACH deposit'],
  ['واریز گروهی آفلاین حقوق و تسهیلات', 'Offline batch payroll and loan deposit'],
  ['حواله ساتنا', 'Satna transfer'],
  ['حواله پایا', 'Paya transfer'],
  ['صدور چک', 'Cheque issuance'],
].map(([persianName, englishName], index) => ({ id: index + 1, persianName, englishName, active: true }));

const UNIT_NAMES = ['برج آرمیتا', 'وزرا', 'سعادت آباد', 'شهرک غرب', 'شهرزیبا', 'ونک', 'تجریش', 'پاسداران'];

const units: UnitResponse[] = Array.from({ length: 120 }, (_, index) => ({
  name: index < UNIT_NAMES.length ? UNIT_NAMES[index] : `واحد ${index + 1}`,
  code: String(1000 + index),
}));

// Each group holds a slice of the units
const groups: (GroupResponse & { unitCodes: string[] })[] = [
  { id: 1, name: 'گروه کشیک تهران', unitCodes: units.slice(0, 87).map(({ code }) => code) },
  { id: 2, name: 'گروه کیش', unitCodes: units.slice(87, 91).map(({ code }) => code) },
  { id: 3, name: 'شعب کشیک تهران', unitCodes: units.slice(91, 105).map(({ code }) => code) },
];

const toMockDays = (from: string, to: string, dayCount = WEEK_DAYS.length): ScopeDayResponse[] =>
  WEEK_DAYS.slice(0, dayCount).map(({ dayOfWeek, dayName }) => ({
    dayOfWeek,
    dayName,
    startWorkingHour: from,
    endWorkingHour: to,
  }));

let scopes: ServiceAccessScopeResponse[] = [
  {
    id: 1,
    title: 'قطعی زیرساخت ساتنا - اعلام بانک مرکزی',
    serviceId: 1,
    serviceName: 'واریز گروهی آفلاین ACH',
    scopeType: 'GROUP',
    groupId: 2,
    groupName: 'گروه کیش',
    unitCode: null,
    unitName: null,
    affectedUnitCount: 4,
    startDate: '2026-06-21',
    endDate: '2027-06-21',
    days: toMockDays('08:00', '14:00'),
  },
  {
    id: 2,
    title: 'واریز گروهی آفلاین ACH',
    serviceId: 1,
    serviceName: 'واریز گروهی آفلاین ACH',
    scopeType: 'UNIT',
    groupId: null,
    groupName: null,
    unitCode: '1000',
    unitName: 'برج آرمیتا',
    affectedUnitCount: 1,
    startDate: '2026-09-01',
    endDate: null,
    days: toMockDays('08:00', '10:00', 4),
  },
  ...[1, 2, 3].map((index) => ({
    id: 2 + index,
    title: 'واریز گروهی آفلاین حقوق و تسهیلات',
    serviceId: 2,
    serviceName: 'واریز گروهی آفلاین حقوق و تسهیلات',
    scopeType: 'GROUP' as const,
    groupId: 1,
    groupName: 'گروه کشیک تهران',
    unitCode: null,
    unitName: null,
    affectedUnitCount: 87,
    startDate: '2026-03-21',
    endDate: `2026-04-${10 + index}`,
    days: toMockDays('07:30', '13:30', 6),
  })),
];

let lastId = scopes.length;

const delay = <T>(value: T): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(structuredClone(value)), MOCK_DELAY));

const findGroup = (id: string | number | null) => groups.find((group) => String(group.id) === String(id));

const MockApi: typeof RealApi = {
  getScopes: () => delay(scopes),

  createScope: (payload: ServiceAccessScopeRequest) => {
    const service = services.find((item) => String(item.id) === String(payload.serviceId));
    const group = findGroup(payload.groupId);
    const unit = units.find(({ code }) => code === payload.unitCode);
    const scope: ServiceAccessScopeResponse = {
      ...payload,
      id: ++lastId,
      serviceName: service?.persianName ?? '',
      groupName: group?.name ?? null,
      unitName: unit?.name ?? null,
      affectedUnitCount: payload.scopeType === 'GROUP' ? group?.unitCodes.length ?? 0 : 1,
    };
    scopes = [scope, ...scopes];
    return delay(scope);
  },

  deleteScope: (id: string) => {
    scopes = scopes.filter((scope) => String(scope.id) !== id);
    return delay(undefined);
  },

  getServices: (): Promise<ServiceListResponse> => delay({ content: services }),

  getGroups: () => delay(groups.map(({ id, name }) => ({ id, name }))),

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
