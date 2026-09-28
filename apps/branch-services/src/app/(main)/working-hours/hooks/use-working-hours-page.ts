import { useRouter, useSearchParams } from 'next/navigation';

import { WORKING_HOURS_PATH, WorkingHoursPage } from '../utils/constants';

// `step` is also read by the layout breadcrumb, which shows its value as the last crumb
const isValidPage = (value: string | null): value is WorkingHoursPage =>
  Object.values(WorkingHoursPage).includes(value as WorkingHoursPage);

const useWorkingHoursPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const step = searchParams.get('step');
  const currentPage = isValidPage(step) ? step : WorkingHoursPage.LIST;

  const navigateTo = (page: WorkingHoursPage) => {
    if (page === WorkingHoursPage.LIST) {
      router.push(WORKING_HOURS_PATH);
      return;
    }

    router.push(`${WORKING_HOURS_PATH}?step=${page}`);
  };

  return { currentPage, navigateTo };
};

export default useWorkingHoursPage;
