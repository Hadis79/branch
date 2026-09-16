import { Locale } from '@branch-services/types';
import { dayjs, Dayjs } from './dayjs-instance';

export function changeDayjsCalendar(locale?: string) {
  if (locale === Locale.FA_IR) {
    dayjs['calendar']('jalali');
  } else {
    dayjs['calendar']('gregory');
  }
}

const formatDateInTimeZone = (date, options, locale) => {
  const timeZone = Locale.FA_IR ? 'Asia/Tehran' : 'America/new_york';
  return new Intl.DateTimeFormat(locale, { timeZone, ...options }).format(
    new Date(date) /*.toLocaleTimeString(_locale, options)*/
  );
};
export function dateLocale(date?: string | number, locale?: string, defaultNow?: boolean) {
  const _locale = locale || Locale.FA_IR;
  const options = { year: 'numeric' as const, month: '2-digit' as const, day: '2-digit' as const };
  const now = new Date();
  if (date) return formatDateInTimeZone(date, options, _locale);
  else if (defaultNow) return formatDateInTimeZone(now, options, _locale);
  return null; //.replace(/\//g, '-'); // replace forward slashes with dashes
}

export function timeLocale(date?: string | number, locale?: string, defaultNow?: boolean) {
  const _locale = locale || Locale.FA_IR;
  const options = { hour: '2-digit' as const, minute: '2-digit' as const /*, second: '2-digit' as const*/ };
  const now = new Date();
  if (date) return formatDateInTimeZone(date, options, _locale);
  else if (defaultNow) formatDateInTimeZone(now, options, _locale);
  return null; //.replace(/\//g, '-'); // replace forward slashes with dashes
}

export function fullDateLocale(date?: string, locale?: string) {
  let result = '';
  const _locale = locale || Locale.FA_IR;

  let year = '';
  let month = '';
  let day = '';
  let weekday = '';

  if (date) {
    year = new Date(date).toLocaleDateString(_locale, { year: 'numeric' });
    month = new Date(date).toLocaleDateString(_locale, { month: 'long' });
    day = new Date(date).toLocaleDateString(_locale, { day: 'numeric' });
    weekday = new Date(date).toLocaleDateString(_locale, { weekday: 'long' });
  } else {
    year = new Date().toLocaleDateString(_locale, { year: 'numeric' });
    month = new Date().toLocaleDateString(_locale, { month: 'long' });
    day = new Date().toLocaleDateString(_locale, { day: 'numeric' });
    weekday = new Date().toLocaleDateString(_locale, { weekday: 'long' });
  }

  result = `${weekday} ${day} ${month} ${year}`;
  return result;
}

export function timeFromDate(date?: string, withSeconds?: boolean) {
  const _date = date || new Date().toTimeString();
  const dateParts = _date.replace('T', ' ').split(' ');
  for (const part of dateParts) {
    if (part.includes(':')) {
      const timeParts = part.split(':');
      if (withSeconds && timeParts.length === 3) {
        return part.trim();
      }
      return `${timeParts[0]}:${timeParts[1]}`;
    }
  }

  return '';
}

export function datetimeLocale(date?: string, locale?: string, withSeconds?: boolean, delimiter = ' , ') {
  let result = '';
  const _locale = locale || Locale.FA_IR;
  try {
    result = `${dateLocale(date, _locale)}${delimiter}${timeLocale(date, _locale)}`;
  } catch (e) {}

  return result;
}

export function toApiDate(date?: string, defaultNow?: boolean) {
  if (date) return new Date(date).toISOString().slice(0, 10);
  else if (defaultNow) return new Date().toISOString().slice(0, 10);
  return null;
}

export function toApiFullDate(date?: string, time?: string, defaultNow?: boolean) {
  if (date) {
    return time ? new Date(date).toISOString().slice(0, 10) + ' ' + time : new Date(date).toISOString();
  } else if (defaultNow) {
    return time ? new Date().toISOString().slice(0, 10) + time + 'Z' : new Date().toISOString();
  }
  return null;
}

export function getTimeFromDayjs(date: Dayjs) {
  try {
    return dayjs(date).format('HH:mm:ss');
  } catch (e) {
    return null;
  }
}

export const getTodayDate = (time?: string) => withTime(time)(dayjs(new Date()));

export const getLastMonth = (time?: string) => withTime(time)(dayjs().subtract(1, 'month'));

export const getLastWeek = (time?: string) => withTime(time)(dayjs().subtract(1, 'week'));

export const getYesterdayDate = (time?: string) => withTime(time)(dayjs(new Date()).subtract(1, 'day'));

export const getLastMonthBeforeYesterday = (time?: string) =>
  withTime(time)(dayjs().subtract(1, 'month').subtract(1, 'day'));

export const getLastWeekBeforeYesterday = (time?: string) =>
  withTime(time)(dayjs(new Date()).subtract(1, 'day').subtract(7, 'day'));

export const getLastDays = (days: number, time?: string) => withTime(time)(dayjs().subtract(days, 'day'));

const withTime = (time?: string) => (date: Dayjs) => {
  if (time) {
    const [hour, minute, second] = time.split(':').map(Number);
    return date
      .hour(hour)
      .minute(minute)
      .second(second ?? 0);
  } else {
    return date;
  }
};

export function toIsoStringWithoutTimezone(date): { date: string; time: string } {
  date = new Date(date);

  date.setTime(date.getTime() - date.getTimezoneOffset() * 60000);

  const dateAsString = date.toISOString().slice(0, 10); // YYYY-MM-DD
  const timeAsString = date.toISOString().slice(11, 19); // HH:MM:SS

  return { date: dateAsString, time: timeAsString };
}

// disable dates after dateFieldName value
export const shouldDisableStartDate = (current, form, dateFieldName: string, disableAfterToday = true) => {
  const toDate = form.getFieldValue(dateFieldName);
  return (
    (current && toDate && current.isAfter(toDate, 'day')) || // Existing logic to disable dates after 'toDate'
    (disableAfterToday && current && current > dayjs().endOf('day')) // Conditionally disable dates after today
  );
};

// disable dates before dateFieldName value
export const shouldDisableEndDate = (current, form, dateFieldName: string, disableAfterToday = true) => {
  const fromDate = form.getFieldValue(dateFieldName);
  return (
    (current && fromDate && current.isBefore(fromDate, 'day')) || // Existing logic to disable dates before 'fromDate'
    (disableAfterToday && current && current > dayjs().endOf('day')) // Conditionally disable dates after today
  );
};
