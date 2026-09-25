import { MessageModel } from '@branch-services/types';
import { create } from 'zustand';

import { HolidayPage, HolidayTab } from '../utils/constants';
import type { CustomListFilter, OfficialHoliday, OfficialListFilter, PageParams } from '../utils/types';

// Only state shared between pages lives here; single-component state stays local.
type State = {
  activeTab: HolidayTab;
  officialFilter: OfficialListFilter;
  officialPagination: PageParams;
  customFilter: CustomListFilter;
  customPagination: PageParams;
  // Rows of the uploaded file, read by the upload details page
  uploadedHolidays: OfficialHoliday[];
  // Which form (if any) the current upload-details / details page was opened from, so it stays mounted for the round trip
  formOrigin: HolidayPage.UPLOAD | HolidayPage.EDIT | null;
  message: MessageModel | null;
};

type Actions = {
  setActiveTab: (activeTab: HolidayTab) => void;
  setOfficialFilter: (filter: OfficialListFilter) => void;
  setOfficialPagination: (pagination: Partial<PageParams>) => void;
  setCustomFilter: (filter: CustomListFilter) => void;
  setCustomPagination: (pagination: Partial<PageParams>) => void;
  setUploadedHolidays: (holidays: OfficialHoliday[], origin: HolidayPage.UPLOAD | HolidayPage.EDIT) => void;
  setFormOrigin: (origin: HolidayPage.UPLOAD | HolidayPage.EDIT | null) => void;
  setMessage: (message: MessageModel | null) => void;
  resetAll: () => void;
};

const initialState: State = {
  activeTab: HolidayTab.OFFICIAL,
  officialFilter: {},
  officialPagination: { page: 1, size: 10 },
  customFilter: {},
  customPagination: { page: 1, size: 10 },
  uploadedHolidays: [],
  formOrigin: null,
  message: null,
};

const useHolidayStore = create<State & Actions>()((set) => ({
  ...initialState,
  setActiveTab: (activeTab) => set({ activeTab }),
  setOfficialFilter: (officialFilter) =>
    set((state) => ({ officialFilter, officialPagination: { ...state.officialPagination, page: 1 } })),
  setOfficialPagination: (pagination) =>
    set((state) => ({ officialPagination: { ...state.officialPagination, ...pagination } })),
  setCustomFilter: (customFilter) =>
    set((state) => ({ customFilter, customPagination: { ...state.customPagination, page: 1 } })),
  setCustomPagination: (pagination) =>
    set((state) => ({ customPagination: { ...state.customPagination, ...pagination } })),
  setUploadedHolidays: (uploadedHolidays, formOrigin) => set({ uploadedHolidays, formOrigin }),
  setFormOrigin: (formOrigin) => set({ formOrigin }),
  setMessage: (message) => set({ message }),
  resetAll: () => set(initialState),
}));

export default useHolidayStore;
