import { MessageModel, PaginationState } from '@branch-services/types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { GroupListItem, GroupUnit } from '../utils/types';

export type GroupListFilter = {
  name?: string;
};

// Only state shared between pages lives here; single-component state stays local.
type State = PaginationState & {
  filter: GroupListFilter;
  message: MessageModel | null;
  // Units of the last uploaded file, read by the upload details page
  uploadedUnits: GroupUnit[];
  // List row picked for editing; the edit page takes the group name and unit count from it
  selectedGroup: GroupListItem | null;
};

type Actions = {
  setUploadedUnits: (units: GroupUnit[]) => void;
  setSelectedGroup: (group: GroupListItem | null) => void;
  setFilter: (filter: GroupListFilter) => void;
  setPagination: (pagination: Partial<PaginationState['pagination']>) => void;
  setMessage: (message: MessageModel) => void;
  resetMessage: () => void;
};

const initialState: State = {
  message: null,
  uploadedUnits: [],
  selectedGroup: null,
  filter: {},
  pagination: {
    size: 10,
    page: 1,
  },
};

const useGroupStore = create<State & Actions>()(
  persist(
    (set) => ({
      ...initialState,
      setUploadedUnits: (uploadedUnits) => set({ uploadedUnits }),
      setSelectedGroup: (selectedGroup) => set({ selectedGroup }),
      setFilter: (filter) => set({ filter }),
      setPagination: (pagination) => set((state) => ({ pagination: { ...state.pagination, ...pagination } })),
      setMessage: (message: MessageModel) => set({ message }),
      resetMessage: () => set({ message: null }),
    }),
    {
      // Only the picked group is kept, so the edit page survives a refresh of the same tab
      name: 'working-calendar-groups',
      storage: createJSONStorage(() => sessionStorage),
      partialize: ({ selectedGroup }) => ({ selectedGroup }),
    }
  )
);

export default useGroupStore;
