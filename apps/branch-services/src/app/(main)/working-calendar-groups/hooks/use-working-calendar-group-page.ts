import { useRouter, useSearchParams } from 'next/navigation';
import { EntryMode, WORKING_CALENDAR_GROUP_PATH, WorkingCalendarGroupPage } from '../utils/constants';

// URL params: `step` is also read by the layout breadcrumb (its value is shown as the last crumb).
// `id` is avoided on purpose, since the breadcrumb adds its own back button for it.
const PARAMS = { page: 'step', groupId: 'groupId', mode: 'mode' } as const;

const isValidPage = (value: string | null): value is WorkingCalendarGroupPage =>
  Object.values(WorkingCalendarGroupPage).includes(value as WorkingCalendarGroupPage);

type NavigateOptions = {
  id?: string | number | null;
  mode?: EntryMode | null;
};

const useWorkingCalendarGroupPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get(PARAMS.page);
  const currentPage = isValidPage(page) ? page : WorkingCalendarGroupPage.LIST;
  const groupId = searchParams.get(PARAMS.groupId);
  const editMode = searchParams.get(PARAMS.mode) === EntryMode.MANUAL ? EntryMode.MANUAL : EntryMode.FILE;

  const navigateTo = (target: WorkingCalendarGroupPage, { id, mode }: NavigateOptions = {}) => {
    if (target === WorkingCalendarGroupPage.LIST) {
      router.push(WORKING_CALENDAR_GROUP_PATH);
      return;
    }

    const params = new URLSearchParams({ [PARAMS.page]: target });
    if (id !== undefined && id !== null) params.set(PARAMS.groupId, String(id));
    if (mode) params.set(PARAMS.mode, mode);

    router.push(`${WORKING_CALENDAR_GROUP_PATH}?${params.toString()}`);
  };

  // The details page is shared by the add and edit forms; `groupId` tells which one it came from.
  const formPage = groupId ? WorkingCalendarGroupPage.EDIT : WorkingCalendarGroupPage.ADD;
  const navigateToForm = () => navigateTo(formPage, { id: groupId, mode: groupId ? editMode : null });
  const navigateToDetails = () =>
    navigateTo(WorkingCalendarGroupPage.DETAILS, { id: groupId, mode: groupId ? editMode : null });

  return { currentPage, groupId, editMode, formPage, navigateTo, navigateToForm, navigateToDetails };
};

export default useWorkingCalendarGroupPage;
