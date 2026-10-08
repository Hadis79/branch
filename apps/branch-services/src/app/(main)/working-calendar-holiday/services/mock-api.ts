import type RealApi from './api';
import { toUploadedHolidayFile } from './mappers';
import { OfficialStatus } from '../utils/constants';
import type {
  CreateOfficialHolidaysDto,
  DeleteHolidayParams,
  Holiday,
  HolidayListFilter,
  NewHoliday,
  Province,
} from '../utils/types';
import { toApiDate, weekdayName } from '../utils/utils';

// In-memory backend with the same signatures as ./api, used while the real service is not ready.
// Upload: a file name containing "dup" returns duplicate rows, one containing "invalid" is rejected.

const MOCK_DELAY = 600;

const provinces: Province[] = [
  { provinceName: 'کشوری (تمام استان‌ها)', unitCodes: [] },
  ...['اصفهان', 'تهران', 'خوزستان', 'قم', 'قزوین', 'فارس', 'خراسان رضوی', 'آذربایجان شرقی'].map((name, index) => ({
    provinceName: `استان ${name}`,
    unitCodes: [String(index + 1), String(index + 101)],
  })),
];

const daysFromToday = (days: number) => toApiDate(new Date(Date.now() + days * 86400000)) as string;

// Rows of an uploaded file, one every 9 days from next month
const fileHolidays: NewHoliday[] = [
  'جشن نوروز/جشن سال نو',
  'عیدنوروز',
  'عیدنوروز',
  'عیدنوروز',
  'روز جمهوری اسلامی',
  'جشن سیزده به در',
  'شهادت امام جعفر صادق (ع)',
  'عید سعید قربان',
  'عید سعید غدیر خم',
  'تاسوعای حسینی',
  'عاشورای حسینی',
  'رحلت امام خمینی',
  'قیام ۱۵ خرداد',
  'اربعین حسینی',
  'رحلت رسول اکرم و شهادت امام حسن مجتبی (ع)',
  'شهادت امام رضا (ع)',
  'شهادت امام حسن عسکری (ع)',
  'میلاد رسول اکرم و امام جعفر صادق (ع)',
  'شهادت حضرت فاطمه زهرا (س)',
  'ولادت امام علی (ع)',
  'مبعث رسول اکرم (ص)',
  'ولادت حضرت قائم (عج)',
  'پیروزی انقلاب اسلامی',
  'شهادت حضرت علی (ع)',
  'روز ملی شدن صنعت نفت',
].map((title, index) => {
  const date = daysFromToday(30 + index * 9);

  return {
    title,
    date,
    holidayDay: weekdayName(date),
    officialStatus: index % 4 === 2 ? OfficialStatus.UNOFFICIAL : OfficialStatus.OFFICIAL,
    provinceName: provinces[0].provinceName,
  };
});

let holidays: Holiday[] = (
  [
    [-20, 'آلودگی هوا', OfficialStatus.UNOFFICIAL, 2],
    [-5, 'روز جمهوری اسلامی', OfficialStatus.OFFICIAL, 0],
    [3, 'آلودگی هوا', OfficialStatus.UNOFFICIAL, 3],
    [10, 'جشن سیزده به در', OfficialStatus.OFFICIAL, 0],
    [16, 'برف و کولاک', OfficialStatus.UNOFFICIAL, 2],
  ] as const
).map(([days, title, officialStatus, provinceIndex], index) => {
  const date = daysFromToday(days);

  return {
    id: String(index + 1),
    date,
    title,
    holidayDay: weekdayName(date),
    officialStatus,
    provinceName: provinces[provinceIndex].provinceName,
  };
});

let lastId = holidays.length;

const delay = <T>(value: T): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(structuredClone(value)), MOCK_DELAY));

const reject = (message: string): Promise<never> =>
  new Promise((_, rejectPromise) =>
    setTimeout(() => rejectPromise({ response: { status: 400, data: { localizedMessage: message } } }), MOCK_DELAY)
  );

const addHolidays = (newHolidays: NewHoliday[]) => {
  const added = newHolidays.map((holiday) => ({ ...holiday, id: String(++lastId) }));
  holidays = [...added, ...holidays].sort((a, b) => a.date.localeCompare(b.date));
  return delay(undefined);
};

const MockApi: typeof RealApi = {
  getProvinces: () => delay(provinces),

  getHolidays: ({ title, provinceName, officialStatus, fromDate, toDate }: HolidayListFilter) => {
    const rows = holidays.filter(
      (holiday) =>
        (!title || holiday.title.includes(title)) &&
        (!provinceName || holiday.provinceName === provinceName) &&
        (!officialStatus || holiday.officialStatus === officialStatus) &&
        (!fromDate || holiday.date >= fromDate) &&
        (!toDate || holiday.date <= toDate)
    );

    return delay(rows);
  },
  updateHoliday: ({ id, ...values }: Holiday) => {
    if (!holidays.some((holiday) => holiday.id === id)) return reject('تعطیلی موردنظر یافت نشد.');

    holidays = holidays.map((holiday) => (holiday.id === id ? { ...holiday, ...values } : holiday));
    return delay(undefined);
  },
  deleteHoliday: ({ provinceName, date }: DeleteHolidayParams) => {
    holidays = holidays.filter((holiday) => !(holiday.provinceName === provinceName && holiday.date === date));
    return delay(undefined);
  },

  uploadOfficialFile: (file: File) => {
    if (file.name.includes('invalid')) return reject('فرمت فایل بارگذاری‌شده معتبر نیست.');

    const hasDuplicates = file.name.includes('dup');
    const rows = fileHolidays.slice(0, hasDuplicates ? 25 : 24);

    return delay({ rowCount: rows.length + (hasDuplicates ? 12 : 0), holidays: rows }).then((response) =>
      toUploadedHolidayFile(response, file)
    );
  },
  createOfficialHolidays: ({ holidays: newHolidays }: CreateOfficialHolidaysDto) => addHolidays(newHolidays),
  createCustomHolidays: (newHolidays: NewHoliday[]) => addHolidays(newHolidays),
};

export default MockApi;
