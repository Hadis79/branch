import { PaginatedData } from '@branch-services/types';

import type RealApi from './api';
import { toServiceListPage } from './mappers';
import type { CreateServiceDto, ServiceItemResponse, ServiceListParams, UpdateServiceParams } from '../utils/types';

// In-memory backend with the same signatures as ./api, used while the real service is not ready.

const MOCK_DELAY = 600;

let services: ServiceItemResponse[] = [
  ['افتتاح حساب', 'Account opening'],
  ['صدور کارت', 'Card issuance'],
  ['پرداخت تسهیلات', 'Loan payment'],
  ['حواله ساتنا', 'Satna transfer'],
  ['حواله پایا', 'Paya transfer'],
  ['صدور چک', 'Cheque issuance'],
  ['ضمانت‌نامه', 'Guarantee'],
  ['اعتبار اسنادی', 'Letter of credit'],
  ['خدمات ارزی', 'Foreign exchange'],
  ['صندوق امانات', 'Safe deposit box'],
  ['بیمه', 'Insurance'],
  ['خدمات بازنشستگی', 'Pension services'],
].map(([name, englishName], index) => ({ id: index + 1, name, englishName, active: index % 4 !== 3 }));

let lastId = services.length;

const delay = <T>(value: T): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(structuredClone(value)), MOCK_DELAY));

const reject = (message: string): Promise<never> =>
  new Promise((_, rejectPromise) =>
    setTimeout(() => rejectPromise({ response: { status: 400, data: { localizedMessage: message } } }), MOCK_DELAY)
  );

const isDuplicateName = ({ name, englishName }: CreateServiceDto, exceptId?: string) =>
  services.some(
    (service) =>
      String(service.id) !== exceptId &&
      (service.name === name.trim() || service.englishName.toLowerCase() === englishName.trim().toLowerCase())
  );

// Same shape as the service pages; `page` is one-based like the api params
const paginate = <T>(items: T[], page: number, size: number): PaginatedData<T> => {
  const content = items.slice((page - 1) * size, page * size);
  const totalPages = Math.ceil(items.length / size);

  return {
    content,
    totalElements: items.length,
    totalPages,
    size,
    number: page - 1,
    sort: { empty: true, sorted: false, unsorted: true },
    first: page === 1,
    last: page >= totalPages,
    numberOfElements: content.length,
    empty: content.length === 0,
  };
};

const MockApi: typeof RealApi = {
  getServices: ({ page, size, name }: ServiceListParams) => {
    const search = name?.trim().toLowerCase();
    const rows = services.filter(
      (service) => !search || service.name.includes(search) || service.englishName.toLowerCase().includes(search)
    );

    return delay(paginate(rows, page, size)).then(toServiceListPage);
  },

  createService: (values: CreateServiceDto) => {
    if (isDuplicateName(values)) return reject('سرویسی با این نام قبلا ثبت شده است.');

    services = [
      { id: ++lastId, name: values.name.trim(), englishName: values.englishName.trim(), active: true },
      ...services,
    ];
    return delay(undefined);
  },

  updateService: ({ id, ...values }: UpdateServiceParams) => {
    if (!services.some((service) => String(service.id) === id)) return reject('سرویس موردنظر یافت نشد.');
    if (isDuplicateName(values, id)) return reject('سرویسی با این نام قبلا ثبت شده است.');

    services = services.map((service) =>
      String(service.id) === id
        ? { ...service, ...values, name: values.name.trim(), englishName: values.englishName.trim() }
        : service
    );
    return delay(undefined);
  },
};

export default MockApi;
