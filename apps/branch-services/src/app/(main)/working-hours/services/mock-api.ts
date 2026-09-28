import type RealApi from './api';
import type { WorkingHoursInfoResponse, WorkingHoursRequest } from '../utils/types';

// In-memory backend used while the real service is not ready.

const MOCK_DELAY = 600;

let workingHours: WorkingHoursInfoResponse | null = null;
let lastId = 0;

const delay = <T>(value: T): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(structuredClone(value)), MOCK_DELAY));

const reject = (message: string, status = 400): Promise<never> =>
  new Promise((_, rejectPromise) =>
    setTimeout(() => rejectPromise({ response: { status, data: { localizedMessage: message } } }), MOCK_DELAY)
  );

// Not-yet-defined is a 404, same as the real service, so the query hook's handling covers both
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

  // No exceptions data model yet; nothing to remove
  deleteException: (): Promise<void> => delay(undefined),
};

export default MockApi;
