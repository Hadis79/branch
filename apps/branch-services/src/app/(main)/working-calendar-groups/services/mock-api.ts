import { PaginatedData } from '@branch-services/types';

import type RealApi from './api';
import { toUploadedGroupFile } from './mappers';
import type { GroupListQueryParams } from '../utils/param-util';
import type {
  DownloadedFile,
  GroupFileUploadResponse,
  UploadedGroupFile,
  GroupListItem,
  GroupRequestDto,
  GroupUnit,
  GroupUnitsParams,
  UpdateGroupParams,
  UploadGroupFileParams,
} from '../utils/types';

// In-memory backend with the same signatures as ./api, used while the real service is not ready.

const MOCK_DELAY = 600;
// Byte order mark, so Excel reads the Persian text of the CSV as UTF-8
const BOM = String.fromCharCode(0xfeff);

const UNIT_NAMES = [
  'شعبه مرکزی تهران',
  'شعبه ونک',
  'شعبه تجریش',
  'شعبه میدان انقلاب',
  'شعبه کشیک قم',
  'شعبه مرکزی قم',
  'شعبه مرکزی اصفهان',
  'شعبه چهارباغ',
  'شعبه مرکزی شیراز',
  'شعبه مرکزی مشهد',
  'شعبه مرکزی تبریز',
  'شعبه مرکزی اهواز',
  'شعبه مرکزی کرج',
  'شعبه مرکزی رشت',
  'شعبه مرکزی کرمان',
  'شعبه مرکزی یزد',
];

const allUnits: GroupUnit[] = UNIT_NAMES.map((name, index) => ({ name, code: String(1001 + index) }));

let lastId = 0;
const nextId = () => String(++lastId);

let groups: UpdateGroupParams[] = [
  { id: nextId(), name: 'شعب کشیک قم', units: allUnits.slice(4, 6) },
  { id: nextId(), name: 'شعب استان تهران', units: allUnits.slice(0, 4) },
  { id: nextId(), name: 'شعب مراکز استان', units: allUnits.slice(5) },
];

const delay = <T>(value: T): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(structuredClone(value)), MOCK_DELAY));

const reject = (message: string): Promise<never> =>
  new Promise((_, rejectPromise) =>
    setTimeout(() => rejectPromise({ response: { status: 400, data: { localizedMessage: message } } }), MOCK_DELAY)
  );

const findGroup = (id: string) => groups.find((group) => group.id === id);

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

const isDuplicateName = (name: string, exceptId?: string) =>
  groups.some((group) => group.id !== exceptId && group.name.trim() === name.trim());

const MockApi: typeof RealApi = {
  getUnitList: () => delay(allUnits),

  getGroupsHistory: ({ page, size, name }: GroupListQueryParams): Promise<PaginatedData<GroupListItem>> => {
    const rows = groups
      .filter((group) => !name || group.name.includes(name))
      .map((group) => ({ id: group.id, name: group.name, size: group.units.length }));

    return delay(paginate(rows, page, size));
  },

  createGroups: ({ name, units }: GroupRequestDto) => {
    if (isDuplicateName(name)) return reject('گروهی با این نام قبلا ثبت شده است.');

    groups = [{ id: nextId(), name: name.trim(), units }, ...groups];
    return delay(undefined);
  },

  getGroupUnits: ({ id, page, size }: GroupUnitsParams) => {
    const group = findGroup(id);
    return group ? delay(paginate(group.units, page, size)) : reject('گروه موردنظر یافت نشد.');
  },

  updateGroup: ({ id, name, units }: UpdateGroupParams) => {
    if (!findGroup(id)) return reject('گروه موردنظر یافت نشد.');
    if (isDuplicateName(name, id)) return reject('گروهی با این نام قبلا ثبت شده است.');

    groups = groups.map((group) => (group.id === id ? { id, name: name.trim(), units } : group));
    return delay(undefined);
  },

  removeGroups: (id: string) => {
    groups = groups.filter((group) => group.id !== id);
    return delay(undefined);
  },

  // A CSV stands in for the excel template, so it can be built without a spreadsheet library
  downloadSampleFile: (): Promise<DownloadedFile> => {
    const rows = [['کد واحد', 'نام واحد'], ...allUnits.slice(0, 3).map(({ code, name }) => [code, name])];
    const csv = `${BOM}${rows.map((row) => row.join(',')).join('\n')}`;

    return new Promise((resolve) =>
      setTimeout(
        () =>
          resolve({
            data: new Blob([csv], { type: 'text/csv' }),
            type: 'text/csv',
            fileName: 'group-units-sample.csv',
          }),
        MOCK_DELAY
      )
    );
  },

  // The real service parses the excel file; here a random subset of units stands in for its rows.
  // The raw response goes through the same mapper as the real service.
  uploadFile: ({ file }: UploadGroupFileParams): Promise<UploadedGroupFile> => {
    const uploadedUnits = allUnits.filter(() => Math.random() > 0.5);
    const result = uploadedUnits.length ? uploadedUnits : allUnits.slice(0, 3);

    const response: GroupFileUploadResponse = {
      success: true,
      fileName: file.name,
      totalRecords: result.length,
      units: result,
    };

    return delay(response).then(toUploadedGroupFile);
  },
};

export default MockApi;
