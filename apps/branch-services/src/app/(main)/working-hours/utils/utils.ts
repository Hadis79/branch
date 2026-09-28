const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

// These are plain "HH:mm" values with no calendar date attached, so digits are mapped directly
// instead of going through a timezone-aware date formatter.
export const toPersianDigits = (value: string): string => value.replace(/[0-9]/g, (digit) => PERSIAN_DIGITS[+digit]);

// "06:00" -> "۰۶:۰۰", used to show a saved hour as text
export const formatHour = toPersianDigits;

// Whole-hour options for the working-hours time selects ("00:00".."23:00")
export const getHourOptions = (): { label: string; value: string }[] =>
  Array.from({ length: 24 }, (_, hour) => {
    const value = `${String(hour).padStart(2, '0')}:00`;
    return { label: toPersianDigits(value), value };
  });
