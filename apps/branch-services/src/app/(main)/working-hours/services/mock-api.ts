import type RealApi from './api';
import { NATIONAL_PROVINCE_NAME, PROVINCE_NAMES, WEEK_DAYS } from '../utils/constants';
import type {
  GroupResponse,
  ProvinceResponse,
  WorkingHoursExceptionRequest,
  WorkingHoursExceptionResponse,
  WorkingHoursInfoResponse,
  WorkingHoursRequest,
} from '../utils/types';

// In-memory backend used while the real service is not ready.

const MOCK_DELAY = 600;

let workingHours: WorkingHoursInfoResponse | null = null;
let lastId = 0;

// Matches calendar/holiday/province/list's shape: a nationwide entry with no unit codes, plus
// every real province
const provinces: ProvinceResponse[] = [
  { provinceName: NATIONAL_PROVINCE_NAME, unitCodes: [] },
  ...PROVINCE_NAMES.map((provinceName, index) => ({ provinceName, unitCodes: [String(index + 1)] })),
];

const groups: GroupResponse[] = [
  { id: 1, name: 'شعب استان تهران', size: 4, groupType: 'WORK_TIME' },
  { id: 2, name: 'شعب مراکز استان', size: 3, groupType: 'WORK_TIME' },
];

// Dates are Jalali here, matching the real GET work-time/exception/list response
let exceptions: WorkingHoursExceptionResponse[] = [
  {
    id: 1,
    title: 'تغییر ساعت کاری فصل تابستان - قم',
    provinceName: 'قم',
    startDate: '1405/03/31',
    endDate: '1405/06/31',
    startWorkingHour: '06:00',
    endWorkingHour: '11:00',
    days: WEEK_DAYS.map(({ dayOfWeek, dayName }) => {
      const isWorking = dayOfWeek !== 'THURSDAY' && dayOfWeek !== 'FRIDAY';
      return {
        dayOfWeek,
        dayName,
        startWorkingHour: isWorking ? '06:00' : null,
        endWorkingHour: isWorking ? '11:00' : null,
      };
    }),
  },
  {
    id: 2,
    title: 'تغییر ساعت کاری زمستان',
    provinceName: NATIONAL_PROVINCE_NAME,
    startDate: '1405/09/30',
    endDate: null,
    startWorkingHour: '07:00',
    endWorkingHour: '14:00',
    days: [
      { dayOfWeek: 'SATURDAY', dayName: 'شنبه', startWorkingHour: '07:00', endWorkingHour: '14:00' },
      { dayOfWeek: 'SUNDAY', dayName: 'یکشنبه', startWorkingHour: '07:00', endWorkingHour: '13:00' },
    ],
  },
];

const delay = <T>(value: T): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(structuredClone(value)), MOCK_DELAY));

const reject = (message: string, status = 400): Promise<never> =>
  new Promise((_, rejectPromise) =>
    setTimeout(() => rejectPromise({ response: { status, data: { localizedMessage: message } } }), MOCK_DELAY)
  );

const notFound = () => reject('ساعت کاری پیش‌فرض یافت نشد.', 404);

const MockApi: typeof RealApi = {
  getWorkingHours: (): Promise<WorkingHoursInfoResponse> => (workingHours ? delay(workingHours) : notFound()),

  createWorkingHours: (payload: WorkingHoursRequest): Promise<WorkingHoursInfoResponse> => {
    workingHours = { id: ++lastId, ...payload };
    return delay(workingHours);
  },

  updateWorkingHours: (payload: WorkingHoursRequest): Promise<WorkingHoursInfoResponse> => {
    if (!workingHours) return notFound();

    workingHours = { ...workingHours, ...payload };
    return delay(workingHours);
  },

  getProvinces: (): Promise<ProvinceResponse[]> => delay(provinces),

  getGroups: (): Promise<GroupResponse[]> => delay(groups),

  getExceptions: (): Promise<WorkingHoursExceptionResponse[]> => delay(exceptions),

  createException: (payload: WorkingHoursExceptionRequest): Promise<WorkingHoursExceptionResponse> => {
    const exception: WorkingHoursExceptionResponse = { id: ++lastId, ...payload };
    exceptions = [exception, ...exceptions];
    return delay(exception);
  },

  deleteException: (id: string): Promise<void> => {
    exceptions = exceptions.filter((exception) => String(exception.id) !== id);
    return delay(undefined);
  },
};

export default MockApi;
