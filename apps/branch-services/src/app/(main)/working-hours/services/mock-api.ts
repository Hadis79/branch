import type RealApi from './api';
import type { WorkingHours, WorkingHoursDto } from '../utils/types';

// In-memory backend used while the real service is not ready.

const MOCK_DELAY = 600;

// Demo data, so the edit modal's exception list (with its delete action) has something to show
const seedExceptions = () => [
  { id: '1', title: 'تغییر ساعت کاری فصل تابستان - قم' },
  { id: '2', title: 'تغییر ساعت کاری زمستان' },
];

let workingHours: WorkingHours | null = null;

const delay = <T>(value: T): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(structuredClone(value)), MOCK_DELAY));

const reject = (message: string): Promise<never> =>
  new Promise((_, rejectPromise) =>
    setTimeout(() => rejectPromise({ response: { status: 400, data: { localizedMessage: message } } }), MOCK_DELAY)
  );

const MockApi: typeof RealApi = {
  getWorkingHours: (): Promise<WorkingHours | null> => delay(workingHours),

  createWorkingHours: ({ from, to }: WorkingHoursDto): Promise<WorkingHours> => {
    workingHours = { from, to, exceptions: seedExceptions() };
    return delay(workingHours);
  },

  updateWorkingHours: ({ from, to }: WorkingHoursDto): Promise<WorkingHours> => {
    if (!workingHours) return reject('ساعت کاری پیش‌فرض یافت نشد.');

    workingHours = { ...workingHours, from, to };
    return delay(workingHours);
  },

  deleteException: (id: string): Promise<void> => {
    if (workingHours)
      workingHours = { ...workingHours, exceptions: workingHours.exceptions.filter((e) => e.id !== id) };
    return delay(undefined);
  },
};

export default MockApi;
