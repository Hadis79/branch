import { MessageModel } from '@branch-services/types';
import { create } from 'zustand';

import type { HolidayListFilter, PageParams, UploadedHolidayFile } from '../utils/types';

// Only state shared between components lives here; single-component state stays local.
type State = {
  filter: HolidayListFilter;
  pagination: PageParams;
  // The uploaded file, shared by the upload form and its details page
  uploadedFile: UploadedHolidayFile | null;
  message: MessageModel | null;
};

type Actions = {
  setFilter: (filter: HolidayListFilter) => void;
  setPagination: (pagination: Partial<PageParams>) => void;
  setUploadedFile: (file: UploadedHolidayFile | null) => void;
  setMessage: (message: MessageModel | null) => void;
  resetAll: () => void;
};

const initialState: State = {
  filter: {},
  pagination: { page: 1, size: 10 },
  uploadedFile: null,
  message: null,
};

const useHolidayStore = create<State & Actions>()((set) => ({
  ...initialState,
  setFilter: (filter) => set((state) => ({ filter, pagination: { ...state.pagination, page: 1 } })),
  setPagination: (pagination) => set((state) => ({ pagination: { ...state.pagination, ...pagination } })),
  setUploadedFile: (uploadedFile) => set({ uploadedFile }),
  setMessage: (message) => set({ message }),
  resetAll: () => set(initialState),
}));

export default useHolidayStore;
