import { MessageModel, PaginationState } from '@branch-services/types';
import { create } from 'zustand';
import type { GroupUnit } from '../utils/types';

export type GroupListFilter = {
  name?: string;
};

// Only state shared between pages lives here; single-component state stays local.
type State = PaginationState & {
  filter: GroupListFilter;
  message: MessageModel | null;
  // Units of the last uploaded file, read by the upload details page
  uploadedUnits: GroupUnit[];
};

type Actions = {
  setUploadedUnits: (units: GroupUnit[]) => void;
  setFilter: (filter: GroupListFilter) => void;
  setPagination: (pagination: Partial<PaginationState['pagination']>) => void;
  setMessage: (message: MessageModel) => void;
  resetMessage: () => void;
};

const initialState: State = {
  message: null,
  uploadedUnits: [],
  filter: {},
  pagination: {
    size: 10,
    page: 1,
  },
};

const useGroupStore = create<State & Actions>()((set) => ({
  ...initialState,
  setUploadedUnits: (uploadedUnits) => set({ uploadedUnits }),
  setFilter: (filter) => set({ filter }),
  setPagination: (pagination) => set((state) => ({ pagination: { ...state.pagination, ...pagination } })),
  setMessage: (message: MessageModel) => set({ message }),
  resetMessage: () => set({ message: null }),
}));

export default useGroupStore;
