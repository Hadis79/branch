import { useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { EntryMode, WORKING_CALENDAR_GROUP_PATH, WorkingCalendarGroupPage } from '../utils/constants';

// URL params: `step` is also read by the layout breadcrumb (its value is shown as the last crumb).
// `id` is avoided on purpose, since the breadcrumb adds its own back button for it.
const PARAMS = { page: 'step', groupId: 'groupId', mode: 'mode', from: 'from' } as const;

const isValidPage = (value: string | null): value is WorkingCalendarGroupPage =>
  Object.values(WorkingCalendarGroupPage).includes(value as WorkingCalendarGroupPage);

type NavigateOptions = {
  id?: string | number | null;
  mode?: EntryMode | null;
  from?: WorkingCalendarGroupPage;
};

const useWorkingCalendarGroupPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get(PARAMS.page);
  const currentPage = isValidPage(page) ? page : WorkingCalendarGroupPage.LIST;
  const groupId = searchParams.get(PARAMS.groupId);
  const editMode = searchParams.get(PARAMS.mode) === EntryMode.MANUAL ? EntryMode.MANUAL : EntryMode.FILE;

  const isGroupDetailsFromList =
    currentPage === WorkingCalendarGroupPage.GROUP_DETAILS &&
    searchParams.get(PARAMS.from) === WorkingCalendarGroupPage.LIST;

  const navigateTo = useCallback(
    (target: WorkingCalendarGroupPage, { id, mode, from }: NavigateOptions = {}) => {
      if (target === WorkingCalendarGroupPage.LIST) {
        router.push(WORKING_CALENDAR_GROUP_PATH);
        return;
      }

      const params = new URLSearchParams({ [PARAMS.page]: target });
      if (id !== undefined && id !== null) params.set(PARAMS.groupId, String(id));
      if (mode) params.set(PARAMS.mode, mode);
      if (from) params.set(PARAMS.from, from);

      router.push(`${WORKING_CALENDAR_GROUP_PATH}?${params.toString()}`);
    },
    [router]
  );

  // The details page is shared by the add and edit forms; `groupId` tells which one it came from.
  const formPage = groupId ? WorkingCalendarGroupPage.EDIT : WorkingCalendarGroupPage.ADD;
  const navigateToForm = useCallback(
    () => navigateTo(formPage, { id: groupId, mode: groupId ? editMode : null }),
    [editMode, formPage, groupId, navigateTo]
  );
  const navigateToDetails = useCallback(
    () => navigateTo(WorkingCalendarGroupPage.DETAILS, { id: groupId, mode: groupId ? editMode : null }),
    [editMode, groupId, navigateTo]
  );
  // Opened from the list or from the edit form; either way, plain browser back returns to it
  const navigateToGroupDetails = useCallback(
    (id: string) => navigateTo(WorkingCalendarGroupPage.GROUP_DETAILS, { id, from: currentPage }),
    [currentPage, navigateTo]
  );
  const goBack = useCallback(() => router.back(), [router]);

  return {
    currentPage,
    isGroupDetailsFromList,
    groupId,
    editMode,
    formPage,
    navigateTo,
    navigateToForm,
    navigateToDetails,
    navigateToGroupDetails,
    goBack,
  };
};

export default useWorkingCalendarGroupPage;
