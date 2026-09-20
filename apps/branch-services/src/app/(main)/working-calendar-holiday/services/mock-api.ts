import { PaginatedData } from '@branch-services/types';

import type RealApi from './api';
import { toStringIds, toUploadedHolidayFile } from './mappers';
import { NATIONAL_REGION_CODE } from '../utils/constants';
import type {
  CreateOfficialHolidaysDto,
  CustomHolidayResponse,
  CustomListParams,
  DownloadedFile,
  NewCustomHoliday,
  OfficialHoliday,
  OfficialListParams,
  OfficialYearResponse,
  Region,
} from '../utils/types';
import { toApiDate } from '../utils/utils';

// In-memory backend with the same signatures as ./api, used while the real service is not ready.
// Upload: a file name containing "dup" returns duplicate rows, one containing "invalid" is rejected.

const MOCK_DELAY = 600;
// Byte order mark, so Excel reads the Persian text of the CSV as UTF-8
const BOM = String.fromCharCode(0xfeff);

const regions: Region[] = [
  { code: NATIONAL_REGION_CODE, name: 'کشوری (تمام استان‌ها)' },
  ...['اصفهان', 'تهران', 'خوزستان', 'قم', 'قزوین', 'فارس', 'خراسان رضوی', 'آذربایجان شرقی'].map((name, index) => ({
    code: String(index + 1),
    name: `استان ${name}`,
  })),
];

const officialHolidays: OfficialHoliday[] = (
  [
    [1, 1, 'جشن نوروز/جشن سال نو'],
    [1, 2, 'عیدنوروز'],
    [1, 3, 'عیدنوروز'],
    [1, 4, 'عیدنوروز'],
    [1, 12, 'روز جمهوری اسلامی'],
    [1, 13, 'جشن سیزده به در'],
    [1, 28, 'شهادت امام جعفر صادق (ع)'],
    [2, 1, 'روز بزرگداشت سعدی'],
    [2, 8, 'عید سعید قربان'],
    [2, 16, 'عید سعید غدیر خم'],
    [3, 5, 'تاسوعای حسینی'],
    [3, 6, 'عاشورای حسینی'],
    [3, 14, 'رحلت امام خمینی'],
    [3, 15, 'قیام ۱۵ خرداد'],
    [4, 15, 'اربعین حسینی'],
    [4, 23, 'رحلت رسول اکرم و شهادت امام حسن مجتبی (ع)'],
    [4, 25, 'شهادت امام رضا (ع)'],
    [5, 2, 'شهادت امام حسن عسکری (ع)'],
    [5, 11, 'میلاد رسول اکرم و امام جعفر صادق (ع)'],
    [8, 22, 'شهادت حضرت فاطمه زهرا (س)'],
    [10, 11, 'ولادت امام علی (ع)'],
    [10, 25, 'مبعث رسول اکرم (ص)'],
    [11, 13, 'ولادت حضرت قائم (عج)'],
    [11, 22, 'پیروزی انقلاب اسلامی'],
    [12, 21, 'شهادت حضرت علی (ع)'],
    [12, 29, 'روز ملی شدن صنعت نفت'],
  ] as const
).map(([month, day, title]) => ({ month, day, title }));

let officialYears: (OfficialYearResponse & { holidays: OfficialHoliday[] })[] = [
  { id: 2, year: 1405, lastModified: '2026-09-12T10:24:00', holidays: officialHolidays },
  { id: 1, year: 1404, lastModified: '2025-09-12T09:10:00', holidays: officialHolidays.slice(0, 24) },
];

const daysFromToday = (days: number) => toApiDate(new Date(Date.now() + days * 86400000)) as string;
const regionOf = (code: string) => regions.find((region) => region.code === code) ?? regions[0];

let customHolidays: CustomHolidayResponse[] = (
  [
    [-20, 'آلودگی هوا', '2'],
    [-5, 'آلودگی هوا', '4'],
    [3, 'آلودگی هوا', '3'],
    [10, 'برف و کولاک', NATIONAL_REGION_CODE],
    [16, 'آلودگی هوا', '2'],
  ] as const
).map(([days, title, regionCode], index) => ({
  id: index + 1,
  date: daysFromToday(days),
  title,
  region: regionOf(regionCode),
}));

let lastId = customHolidays.length;

const delay = <T>(value: T): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(structuredClone(value)), MOCK_DELAY));

const reject = (message: string): Promise<never> =>
  new Promise((_, rejectPromise) =>
    setTimeout(() => rejectPromise({ response: { status: 400, data: { localizedMessage: message } } }), MOCK_DELAY)
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

// A CSV stands in for the excel files, so they can be built without a spreadsheet library
const toCsvFile = (holidays: OfficialHoliday[], fileName: string): Promise<DownloadedFile> => {
  const rows = [['روز', 'ماه', 'عنوان'], ...holidays.map(({ day, month, title }) => [day, month, title])];
  const csv = `${BOM}${rows.map((row) => row.join(',')).join('\n')}`;

  return delay({ data: new Blob([csv], { type: 'text/csv' }), type: 'text/csv', fileName });
};

const MockApi: typeof RealApi = {
  getRegions: () => delay(regions),

  getOfficialYears: ({ page, size, year }: OfficialListParams) => {
    const rows = officialYears
      .filter((item) => !year || item.year === year)
      .map(({ id, year: itemYear, lastModified }) => ({ id, year: itemYear, lastModified }));

    return delay(paginate(rows, page, size)).then(toStringIds);
  },
  getOfficialHolidays: (year: number) => {
    const item = officialYears.find((official) => official.year === year);
    return item ? delay(item.holidays) : reject('تعطیلات این سال یافت نشد.');
  },
  downloadOfficialHolidays: (year: number) =>
    toCsvFile(officialYears.find((item) => item.year === year)?.holidays ?? [], `holidays-${year}.csv`),
  downloadSampleFile: () => toCsvFile(officialHolidays.slice(0, 3), 'holidays-sample.csv'),
  uploadOfficialFile: (file: File) => {
    if (file.name.includes('invalid')) return reject('فرمت فایل بارگذاری‌شده معتبر نیست.');

    const hasDuplicates = file.name.includes('dup');
    return delay({
      success: true,
      fileName: file.name,
      fileType: file.name
        .split('.')
        .pop()
        ?.replace(/^./, (letter) => letter.toUpperCase()),
      holidays: hasDuplicates ? officialHolidays.slice(0, 25) : officialHolidays.slice(0, 24),
      duplicateCount: hasDuplicates ? 12 : 0,
    }).then(toUploadedHolidayFile);
  },
  createOfficialHolidays: ({ year, holidays }: CreateOfficialHolidaysDto) => {
    if (officialYears.some((item) => item.year === year)) return reject('تعطیلات این سال قبلا ثبت شده است.');

    officialYears = [{ id: ++lastId, year, lastModified: new Date().toISOString(), holidays }, ...officialYears];
    return delay(undefined);
  },

  getCustomHolidays: ({ page, size, title, regionCode, fromDate, toDate }: CustomListParams) => {
    const rows = customHolidays.filter(
      (holiday) =>
        (!title || holiday.title.includes(title)) &&
        (!regionCode || holiday.region.code === regionCode) &&
        (!fromDate || holiday.date >= fromDate) &&
        (!toDate || holiday.date <= toDate)
    );

    return delay(paginate(rows, page, size)).then(toStringIds);
  },
  createCustomHolidays: (holidays: NewCustomHoliday[]) => {
    const added = holidays.map(({ title, regionCode, date }) => ({
      id: ++lastId,
      title,
      date,
      region: regionOf(regionCode),
    }));
    customHolidays = [...added, ...customHolidays].sort((a, b) => a.date.localeCompare(b.date));
    return delay(undefined);
  },
  deleteCustomHoliday: (id: string) => {
    customHolidays = customHolidays.filter((holiday) => String(holiday.id) !== id);
    return delay(undefined);
  },
};

export default MockApi;
