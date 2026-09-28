import type RealApi from './api';
import type { WorkingHours, WorkingHoursDto } from '../utils/types';

// In-memory backend used while the real service is not ready.

const MOCK_DELAY = 600;

// Matches the title returned by the real GET work-time/default/info
const DEFAULT_TITLE = 'ساعت کاری پیش‌فرض بانک ملی ایران';

// Demo data, so the edit modal's exception list (with its delete action) has something to show
const seedExceptions = () => [
  { id: '1', title: 'تغییر ساعت کاری فصل تابستان - قم' },
  { id: '2', title: 'تغییر ساعت کاری زمستان' },
];

let workingHours: WorkingHours | null = null;

const delay = <T>(value: T): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(structuredClone(value)), MOCK_DELAY));

const reject = (message: string, status = 400): Promise<never> =>
  new Promise((_, rejectPromise) =>
    setTimeout(() => rejectPromise({ response: { status, data: { localizedMessage: message } } }), MOCK_DELAY)
  );

// Not-yet-defined is a 404, same as the real service, so the query hook's handling covers both
const notFound = () => reject('ساعت کاری پیش‌فرض یافت نشد.', 404);

const MockApi: typeof RealApi = {
  getWorkingHours: (): Promise<WorkingHours> => (workingHours ? delay(workingHours) : notFound()),

  createWorkingHours: ({ from, to }: WorkingHoursDto): Promise<WorkingHours> => {
    workingHours = { title: DEFAULT_TITLE, from, to, exceptions: seedExceptions() };
    return delay(workingHours);
  },

  updateWorkingHours: ({ from, to }: WorkingHoursDto): Promise<WorkingHours> => {
    if (!workingHours) return notFound();

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
