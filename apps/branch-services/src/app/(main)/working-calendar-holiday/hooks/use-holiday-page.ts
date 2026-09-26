import { useRouter, useSearchParams } from 'next/navigation';

import { HOLIDAY_PATH, HolidayPage } from '../utils/constants';

// `step` is also read by the layout breadcrumb, which shows its value as the last crumb
const PARAMS = { page: 'step', year: 'year' } as const;

const isValidPage = (value: string | null): value is HolidayPage =>
  Object.values(HolidayPage).includes(value as HolidayPage);

const useHolidayPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const step = searchParams.get(PARAMS.page);
  const currentPage = isValidPage(step) ? step : HolidayPage.LIST;
  const year = Number(searchParams.get(PARAMS.year)) || null;

  const navigateTo = (page: HolidayPage, params: { year?: number } = {}) => {
    if (page === HolidayPage.LIST) {
      router.push(HOLIDAY_PATH);
      return;
    }

    const query = new URLSearchParams({ [PARAMS.page]: page });
    if (params.year) query.set(PARAMS.year, String(params.year));
    router.push(`${HOLIDAY_PATH}?${query.toString()}`);
  };

  return { currentPage, year, navigateTo };
};

export default useHolidayPage;
