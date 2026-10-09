import { i18nBase } from '@branch-services/translation';
import { dateLocale, dayjs, Dayjs, toIsoStringWithoutTimezone } from '@branch-services/utils';

import { SCOPE_TYPES } from './constants';
import type { Duty, DutyDto, DutyFormValues, DutySlot, PageParams, ScopeType } from './types';

const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

const toPersianDigits = (value: string): string => value.replace(/[0-9]/g, (digit) => PERSIAN_DIGITS[+digit]);

const isPersian = () => i18nBase.language === 'fa';

// Digits shown as written (hours, codes): "08:00" -> "۰۸:۰۰" in Persian, unchanged in English
export const formatDigits = (value: string | number): string =>
  isPersian() ? toPersianDigits(String(value)) : String(value);

// A count shown as text, with Persian digits in Persian
export const formatCount = (value: number): string => (isPersian() ? value.toLocaleString('fa-IR') : String(value));

const getLocale = () => (isPersian() ? 'fa-IR' : 'en-US');

// dateLocale formats in Tehran time, so the weekday is read in Tehran time too; in the browser's own
// zone, an api date (parsed as UTC midnight) can fall on the previous day
const DATE_TIME_ZONE = 'Asia/Tehran';

// An api date (YYYY-MM-DD) with its weekday: "پنجشنبه ۱۴۰۵/۰۶/۱۴"
export const formatSlotDate = (date: string): string => {
  const locale = getLocale();
  const weekday = new Date(date).toLocaleDateString(locale, { weekday: 'long', timeZone: DATE_TIME_ZONE });
  return `${weekday} ${dateLocale(date, locale) ?? ''}`;
};

// A calendar month and year as its header shows them: "شهریور ۱۴۰۵". Formatted apart, since the
// combined format puts the year first in Persian ("۱۴۰۵ شهریور").
export const formatMonth = (date: Dayjs): string => {
  const value = date.toDate();
  const locale = getLocale();
  return `${value.toLocaleDateString(locale, { month: 'long' })} ${value.toLocaleDateString(locale, {
    year: 'numeric',
  })}`;
};

// A server hour as the UI keeps it: "08:00:00" -> "08:00", so hours compare as plain strings
export const toHourMinute = (value: string): string => value.slice(0, 5);

// Translation keys tied to a scope type (see SCOPE_TYPES)
export const getScopeTypeKeys = (type: ScopeType) => SCOPE_TYPES.find((item) => item.type === type) ?? SCOPE_TYPES[0];

// A unit is shown with its code, as it is picked: "برج آرمیتا - ۱۰۳۳"
export const toUnitLabel = (name: string, code: string): string => `${name} - ${formatDigits(code)}`;

// Number of a table row across pages, starting from 1
export const getRowNumber = (index: number, { page, size }: PageParams): number => (page - 1) * size + index + 1;

// Date picker value -> api date (YYYY-MM-DD)
export const toApiDate = (date: Dayjs | Date): string => toIsoStringWithoutTimezone(date).date;

// A slot's start or end as a date-time
const toSlotTime = (date: string, hour: string): Dayjs => {
  const [hours, minutes] = hour.split(':').map(Number);
  return dayjs(date).hour(hours).minute(minutes).second(0).millisecond(0);
};

// Two slots of the same day whose hours cross; touching ends (10:00 - 10:00) don't overlap
const overlaps = (a: DutySlot, b: DutySlot): boolean => a.date === b.date && a.from < b.to && b.from < a.to;

// Why a new slot can't be added (a translation key), or null when it can. "HH:mm" values compare
// chronologically as plain strings.
export const getSlotError = (slot: DutySlot, slots: DutySlot[]): string | null => {
  if (slot.to <= slot.from) return 'end_before_start';
  if (!toSlotTime(slot.date, slot.from).isAfter(dayjs())) return 'slot_in_past';
  if (slots.some((other) => overlaps(slot, other))) return 'slot_overlap';
  return null;
};

const compareSlots = (a: DutySlot, b: DutySlot): number => a.date.localeCompare(b.date) || a.from.localeCompare(b.from);

export const sortSlots = (slots: DutySlot[]): DutySlot[] => [...slots].sort(compareSlots);

export const addSlot = (slots: DutySlot[], slot: DutySlot): DutySlot[] => sortSlots([...slots, slot]);

export const isSameSlot = (a: DutySlot, b: DutySlot): boolean =>
  a.date === b.date && a.from === b.from && a.to === b.to;

// The group or unit picked on the active tab
export const getFormTarget = (values: Partial<DutyFormValues>) =>
  values.scopeType === 'UNIT' ? values.unit : values.group;

// The create form's values as a duty
export const toDutyDto = (values: DutyFormValues): DutyDto => {
  const target = getFormTarget(values);

  return {
    title: values.title.trim(),
    target: { type: values.scopeType, id: target?.value ?? '', label: target?.label ?? '' },
    slots: values.slots,
  };
};

// A duty expires once its last slot has ended
export const isExpiredDuty = ({ slots }: Pick<Duty, 'slots'>): boolean =>
  slots.every((slot) => toSlotTime(slot.date, slot.to).isBefore(dayjs()));

// Active duties first, then the expired ones (read-only)
export const splitByExpiry = (duties: Duty[]) => {
  const active: Duty[] = [];
  const expired: Duty[] = [];
  duties.forEach((duty) => (isExpiredDuty(duty) ? expired : active).push(duty));
  return { active, expired };
};
