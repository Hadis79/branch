import { MessageModel, PaginationState } from '@branch-services/types';
import { create } from 'zustand';
import type { GroupUnit } from '../utils/types';

export type FormValues = {
  filter: Partial<{
    name: string;
  }>;
  error: null;
  message: MessageModel | null;
  uploadedUnits: GroupUnit[];
  selectedGroupId: string | null;
};

type Actions = {
  setUploadedUnits: (units: GroupUnit[]) => void;
  setFilter: (filter: FormValues['filter']) => void;
  setPagination: (pagination: PaginationState['pagination']) => void;
  setMessage: (message: MessageModel) => void;
  resetMessage: () => void;
  setSelectedGroupId: (id: string | null) => void;
};

export type State = FormValues & PaginationState;

const initialState: State = {
  error: null,
  message: null,
  uploadedUnits: [],
  filter: {},
  selectedGroupId: null,
  pagination: {
    size: 10,
    page: 1,
    count: 0,
    current: 0,
  },
};

const useGroupStore = create<State & Actions>()((set) => ({
  ...initialState,
  setUploadedUnits: (uploadedUnits) => set({ uploadedUnits }),
  setFilter: (filter) => set({ filter }),
  setSelectedGroupId: (id) => set({ selectedGroupId: id }),
  setPagination: (pagination) => {
    set((state) => ({
      pagination: {
        ...state.pagination,
        ...pagination,
      },
    }));
  },
  setMessage: (message: MessageModel) => set({ message }),
  resetMessage: () => set({ message: null }),
}));

export default useGroupStore;
