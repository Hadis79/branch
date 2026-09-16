import { useRouter, useSearchParams } from 'next/navigation';
import { WORKING_CALENDAR_GROUP_PATH, WorkingCalendarGroupPage } from '../utils/constants';

const isValidPage = (value: string | null): value is WorkingCalendarGroupPage =>
  Object.values(WorkingCalendarGroupPage).includes(value as WorkingCalendarGroupPage);

const useWorkingCalendarGroupPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const currentPage = isValidPage(type) ? type : WorkingCalendarGroupPage.LIST;

  const navigateTo = (page: WorkingCalendarGroupPage, id?: string | number) => {
    if (page === WorkingCalendarGroupPage.LIST) {
      router.push(WORKING_CALENDAR_GROUP_PATH);
      return;
    }

    const params = new URLSearchParams({ type: page });
    if (id !== undefined) params.set('id', String(id));

    router.push(`${WORKING_CALENDAR_GROUP_PATH}?${params.toString()}`);
  };

  return { currentPage, navigateTo };
};

export default useWorkingCalendarGroupPage;
