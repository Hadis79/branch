import type RealApi from './api';
import { WEEK_DAYS } from '../utils/constants';
import type {
  RuleDayResponse,
  ServiceListResponse,
  ServiceResponse,
  ServiceRuleRequest,
  ServiceRuleResponse,
} from '../utils/types';

// In-memory backend with the same signatures as ./api, used while the real service is not ready.

const MOCK_DELAY = 600;

const services: ServiceResponse[] = [
  ['واریز گروهی آفلاین ACH', 'Offline batch ACH deposit'],
  ['واریز گروهی آفلاین حقوق و تسهیلات', 'Offline batch payroll and loan deposit'],
  ['حواله ساتنا', 'Satna transfer'],
  ['حواله پایا', 'Paya transfer'],
  ['صدور چک', 'Cheque issuance'],
  ['افتتاح حساب', 'Account opening'],
].map(([persianName, englishName], index) => ({
  id: index + 1,
  persianName,
  englishName,
  active: true,
  overridable: index !== 5,
}));

const toMockDays = (from: string, to: string, dayCount = WEEK_DAYS.length): RuleDayResponse[] =>
  WEEK_DAYS.slice(0, dayCount).map(({ dayOfWeek, dayName }) => ({
    dayOfWeek,
    dayName,
    startWorkingHour: from,
    endWorkingHour: to,
  }));

let rules: ServiceRuleResponse[] = [
  {
    id: 1,
    title: 'قطعی زیرساخت ساتنا - اعلام بانک مرکزی',
    serviceId: 1,
    serviceName: 'واریز گروهی آفلاین ACH',
    startDate: '2026-06-21',
    endDate: '2027-06-21',
    days: toMockDays('08:00', '14:00'),
  },
  {
    id: 2,
    title: 'واریز گروهی آفلاین ACH',
    serviceId: 1,
    serviceName: 'واریز گروهی آفلاین ACH',
    startDate: '2026-09-01',
    endDate: null,
    days: toMockDays('08:00', '10:00', 4),
  },
  {
    id: 3,
    title: 'واریز گروهی آفلاین حقوق و تسهیلات',
    serviceId: 2,
    serviceName: 'واریز گروهی آفلاین حقوق و تسهیلات',
    startDate: '2026-03-21',
    endDate: '2026-04-20',
    days: toMockDays('07:30', '13:30', 6),
  },
];

let lastId = rules.length;

const delay = <T>(value: T): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(structuredClone(value)), MOCK_DELAY));

const MockApi: typeof RealApi = {
  getRules: () => delay(rules),

  createRule: (payload: ServiceRuleRequest) => {
    const service = services.find((item) => String(item.id) === String(payload.serviceId));
    const rule: ServiceRuleResponse = { id: ++lastId, serviceName: service?.persianName ?? '', ...payload };
    rules = [rule, ...rules];
    return delay(rule);
  },

  deleteRule: (id: string) => {
    rules = rules.filter((rule) => String(rule.id) !== id);
    return delay(undefined);
  },

  getServices: (): Promise<ServiceListResponse> => delay({ content: services }),
};

export default MockApi;
