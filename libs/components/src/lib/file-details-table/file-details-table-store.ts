import { create } from 'zustand';

interface Pagination {
  size: number;
  page: number;
}

interface PaginationState {
  pagination: Pagination;
  filter?: {
    destinationAccount?: string;
    status?: string;
  };
}

type Actions = {
  setPagination: (pagination: Pagination) => void;
  setFilter: (filter) => void;
  resetFilter: () => void;
};

const initialState: PaginationState = {
  pagination: {
    size: 10,
    page: 1,
  },
  filter: {},
};

const useFileDetailsTableStore = create<PaginationState & Actions>((set) => ({
  ...initialState,
  setPagination: (pagination) =>
    set((state) => ({
      pagination: { ...state.pagination, ...pagination },
    })),
  setFilter: (filterValues) =>
    set(() => ({
      filter: filterValues,
    })),
  resetFilter: () => set({ filter: undefined }),
}));

export const usePagination = () => useFileDetailsTableStore((state) => state.pagination);
export const useSetPagination = () => useFileDetailsTableStore((state) => state.setPagination);

export default useFileDetailsTableStore;
