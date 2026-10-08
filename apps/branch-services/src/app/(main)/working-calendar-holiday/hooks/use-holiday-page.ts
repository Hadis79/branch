import { useRouter, useSearchParams } from 'next/navigation';

import { HOLIDAY_PATH, HolidayPage } from '../utils/constants';

// `step` is also read by the layout breadcrumb, which shows its value as the last crumb
const PAGE_PARAM = 'step';

const isValidPage = (value: string | null): value is HolidayPage =>
  Object.values(HolidayPage).includes(value as HolidayPage);

const useHolidayPage = () => {
  const router = useRouter();
  const step = useSearchParams().get(PAGE_PARAM);
  const currentPage = isValidPage(step) ? step : HolidayPage.LIST;

  const navigateTo = (page: HolidayPage) =>
    router.push(page === HolidayPage.LIST ? HOLIDAY_PATH : `${HOLIDAY_PATH}?${PAGE_PARAM}=${page}`);

  return { currentPage, navigateTo };
};

export default useHolidayPage;
