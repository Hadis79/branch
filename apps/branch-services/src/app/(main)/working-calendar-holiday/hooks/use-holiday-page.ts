import { useRouter, useSearchParams } from 'next/navigation';

import { HOLIDAY_PATH, HolidayPage } from '../utils/constants';

// `step` is also read by the layout breadcrumb, which shows its value as the last crumb
const PARAMS = { page: 'step', year: 'year', id: 'id' } as const;

const isValidPage = (value: string | null): value is HolidayPage =>
  Object.values(HolidayPage).includes(value as HolidayPage);

const useHolidayPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const step = searchParams.get(PARAMS.page);
  const currentPage = isValidPage(step) ? step : HolidayPage.LIST;
  const year = Number(searchParams.get(PARAMS.year)) || null;
  // Id of the official year record, used to fetch its holidays (`getOfficialHolidays`)
  const id = searchParams.get(PARAMS.id);

  const navigateTo = (page: HolidayPage, params: { year?: number; id?: string } = {}) => {
    if (page === HolidayPage.LIST) {
      router.push(HOLIDAY_PATH);
      return;
    }

    const query = new URLSearchParams({ [PARAMS.page]: page });
    if (params.year) query.set(PARAMS.year, String(params.year));
    if (params.id) query.set(PARAMS.id, params.id);
    router.push(`${HOLIDAY_PATH}?${query.toString()}`);
  };

  return { currentPage, year, id, navigateTo };
};

export default useHolidayPage;
