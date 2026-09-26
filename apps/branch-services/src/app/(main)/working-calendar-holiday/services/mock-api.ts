import type RealApi from './api';
import { toUploadedHolidayFile } from './mappers';
import { OfficialStatus } from '../utils/constants';
import type {
  CreateOfficialHolidaysDto,
  CustomHolidayResponse,
  CustomListFilter,
  DeleteCustomHolidayParams,
  DownloadedFile,
  NewCustomHoliday,
  OfficialHoliday,
  OfficialListParams,
  OfficialYearResponse,
  Province,
} from '../utils/types';
import { JALALI_MONTHS, toApiDate, weekdayName } from '../utils/utils';

// In-memory backend with the same signatures as ./api, used while the real service is not ready.
// Upload: a file name containing "dup" returns duplicate rows, one containing "invalid" is rejected.

const MOCK_DELAY = 600;
// Byte order mark, so Excel reads the Persian text of the CSV as UTF-8
const BOM = String.fromCharCode(0xfeff);

const provinces: Province[] = [
  { provinceName: 'کشوری (تمام استان‌ها)', unitCodes: [] },
  ...['اصفهان', 'تهران', 'خوزستان', 'قم', 'قزوین', 'فارس', 'خراسان رضوی', 'آذربایجان شرقی'].map((name, index) => ({
    provinceName: `استان ${name}`,
    unitCodes: [String(index + 1), String(index + 101)],
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
).map(([month, day, title]) => ({ month: JALALI_MONTHS[month - 1], day, title }));

let officialYears: (OfficialYearResponse & { holidays: OfficialHoliday[] })[] = [
  { id: '2', year: 1405, modifiedOn: '2026-09-12T10:24:00', holidays: officialHolidays },
  { id: '1', year: 1404, modifiedOn: '2025-09-12T09:10:00', holidays: officialHolidays.slice(0, 24) },
];

const daysFromToday = (days: number) => toApiDate(new Date(Date.now() + days * 86400000)) as string;

let customHolidays: CustomHolidayResponse[] = (
  [
    [-20, 'آلودگی هوا', 2],
    [-5, 'آلودگی هوا', 4],
    [3, 'آلودگی هوا', 3],
    [10, 'برف و کولاک', 0],
    [16, 'آلودگی هوا', 2],
  ] as const
).map(([days, title, provinceIndex], index) => {
  const date = daysFromToday(days);

  return {
    id: String(index + 1),
    date,
    title,
    holidayDay: weekdayName(date),
    officialStatus: OfficialStatus.UNOFFICIAL,
    province: provinces[provinceIndex],
  };
});

let lastId = customHolidays.length;

const delay = <T>(value: T): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(structuredClone(value)), MOCK_DELAY));

const reject = (message: string): Promise<never> =>
  new Promise((_, rejectPromise) =>
    setTimeout(() => rejectPromise({ response: { status: 400, data: { localizedMessage: message } } }), MOCK_DELAY)
  );

// A CSV stands in for the excel files, so they can be built without a spreadsheet library
const toCsvFile = (holidays: OfficialHoliday[], fileName: string): Promise<DownloadedFile> => {
  const rows = [['روز', 'ماه', 'عنوان'], ...holidays.map(({ day, month, title }) => [day, month, title])];
  const csv = `${BOM}${rows.map((row) => row.join(',')).join('\n')}`;

  return delay({ data: new Blob([csv], { type: 'text/csv' }), type: 'text/csv', fileName });
};

const MockApi: typeof RealApi = {
  getProvinces: () => delay(provinces),

  getOfficialYears: ({ year }: OfficialListParams) => {
    const rows = officialYears
      .filter((item) => !year || item.year === year)
      .map(({ id, year: itemYear, modifiedOn }) => ({ id, year: itemYear, modifiedOn }));

    return delay(rows);
  },
  getOfficialHolidays: (id: string) => {
    const item = officialYears.find((official) => official.id === id);
    return item ? delay(item.holidays) : reject('تعطیلات این سال یافت نشد.');
  },
  downloadOfficialHolidays: (year: number) =>
    toCsvFile(officialYears.find((item) => item.year === year)?.holidays ?? [], `holidays-${year}.csv`),
  downloadSampleFile: () => toCsvFile(officialHolidays.slice(0, 3), 'holidays-sample.csv'),
  uploadOfficialFile: (file: File) => {
    if (file.name.includes('invalid')) return reject('فرمت فایل بارگذاری‌شده معتبر نیست.');

    const hasDuplicates = file.name.includes('dup');
    const holidays = officialHolidays.slice(0, hasDuplicates ? 25 : 24);

    return delay({ rowCount: holidays.length + (hasDuplicates ? 12 : 0), holidays }).then((response) =>
      toUploadedHolidayFile(response, file)
    );
  },
  createOfficialHolidays: ({ year, holidays }: CreateOfficialHolidaysDto) => {
    if (officialYears.some((item) => item.year === year)) return reject('تعطیلات این سال قبلا ثبت شده است.');

    officialYears = [{ id: String(++lastId), year, modifiedOn: new Date().toISOString(), holidays }, ...officialYears];
    return delay(undefined);
  },
  updateOfficialHolidays: ({ year, holidays }: CreateOfficialHolidaysDto) => {
    const item = officialYears.find((official) => official.year === year);
    if (!item) return reject('تعطیلات این سال یافت نشد.');

    item.holidays = holidays;
    item.modifiedOn = new Date().toISOString();
    return delay(undefined);
  },

  getCustomHolidays: ({ title, provinceName, fromDate, toDate }: CustomListFilter) => {
    const rows = customHolidays.filter(
      (holiday) =>
        (!title || holiday.title.includes(title)) &&
        (!provinceName || holiday.province.provinceName === provinceName) &&
        (!fromDate || holiday.date >= fromDate) &&
        (!toDate || holiday.date <= toDate)
    );

    return delay(rows);
  },
  createCustomHolidays: (holidays: NewCustomHoliday[]) => {
    const added = holidays.map((holiday) => ({ ...holiday, id: String(++lastId) }));
    customHolidays = [...added, ...customHolidays].sort((a, b) => a.date.localeCompare(b.date));
    return delay(undefined);
  },
  deleteCustomHoliday: ({ provinceName, date }: DeleteCustomHolidayParams) => {
    customHolidays = customHolidays.filter(
      (holiday) => !(holiday.province.provinceName === provinceName && holiday.date === date)
    );
    return delay(undefined);
  },
};

export default MockApi;
