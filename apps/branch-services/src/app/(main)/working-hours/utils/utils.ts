import { Dayjs, dayjs, toIsoStringWithoutTimezone } from '@branch-services/utils';

const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

// These are plain "HH:mm" values with no calendar date attached, so digits are mapped directly
// instead of going through a timezone-aware date formatter.
export const toPersianDigits = (value: string): string => value?.replace(/[0-9]/g, (digit) => PERSIAN_DIGITS[+digit]);

// "06:00" -> "۰۶:۰۰", used to show a saved hour as text
export const formatHour = toPersianDigits;

// Whole-hour options for the working-hours time selects ("00:00".."23:00")
export const getHourOptions = (): { label: string; value: string }[] =>
  Array.from({ length: 24 }, (_, hour) => {
    const value = `${String(hour).padStart(2, '0')}:00`;
    return { label: toPersianDigits(value), value };
  });

// Inclusive day count of an exception's date range, shown in its preview
export const getDayCount = (startDate: string, endDate: string): number =>
  dayjs(endDate).diff(dayjs(startDate), 'day') + 1;

// Minutes since midnight, so an hour range can be positioned on the preview's hour bar
export const toMinutesOfDay = (time: string): number => {
  const [hour, minute] = time.split(':').map(Number);
  return hour * 60 + minute;
};

// Whole hours from the range's start to a few hours past its end (capped at 23:00), so the bar's
// visible track lines up with its tick labels instead of always spanning the full day
export const getHourWindow = (from: string, to: string): number[] => {
  const fromHour = Math.floor(toMinutesOfDay(from) / 60);
  const toHour = Math.min(23, Math.ceil(toMinutesOfDay(to) / 60) + 3);
  return Array.from({ length: toHour - fromHour + 1 }, (_, index) => fromHour + index);
};

// Date picker value -> api date (YYYY-MM-DD)
export const toApiDate = (date?: Dayjs | Date | null): string | undefined =>
  date ? toIsoStringWithoutTimezone(date).date : undefined;

// The exceptions list returns Jalali dates ("1405/03/31"), unlike the ISO dates it's created
// with; parsed explicitly as Jalali so this doesn't depend on the app's current calendar mode.
export const fromJalaliDate = (value: string): string =>
  toApiDate(dayjs(value.replace(/\//g, '-'), { jalali: true })) as string;
