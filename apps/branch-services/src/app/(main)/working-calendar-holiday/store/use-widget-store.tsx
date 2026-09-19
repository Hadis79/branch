import { MessageModel } from '@branch-services/types';
import { create } from 'zustand';

import { HolidayTab } from '../utils/constants';
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
  message: MessageModel | null;
};

type Actions = {
  setActiveTab: (activeTab: HolidayTab) => void;
  setOfficialFilter: (filter: OfficialListFilter) => void;
  setOfficialPagination: (pagination: Partial<PageParams>) => void;
  setCustomFilter: (filter: CustomListFilter) => void;
  setCustomPagination: (pagination: Partial<PageParams>) => void;
  setUploadedHolidays: (holidays: OfficialHoliday[]) => void;
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
  setUploadedHolidays: (uploadedHolidays) => set({ uploadedHolidays }),
  setMessage: (message) => set({ message }),
  resetAll: () => set(initialState),
}));

export default useHolidayStore;
