import dayjs, { Dayjs } from 'dayjs';
// import jalaliday from 'jalaliday';
import jalaliday from 'jalali-plugin-dayjs';
import calendar from 'dayjs/plugin/calendar';

dayjs.extend(calendar);
dayjs.extend(jalaliday);

dayjs['calendar']('jalali'); // Set the default calendar

export { dayjs, Dayjs };
