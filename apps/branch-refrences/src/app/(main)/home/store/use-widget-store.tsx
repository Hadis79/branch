import { PaginationState } from '@branch-services/types';
import { create } from 'zustand';

export type FormValues = {
  filter: Partial<{
    accountNumber: string;
  }>;
  error: null;
};

type Actions = {
  setFilter: (filter: FormValues['filter']) => void;
  setPagination: (pagination: PaginationState['pagination']) => void;
};

export type State = FormValues & PaginationState;

const initialState: State = {
  error: null,
  filter: {},
  pagination: {
    limit: 10,
    offset: 0,
    count: 0,
    current: 0,
  },
};

const useWidgetStore = create<State & Actions>()((set) => ({
  ...initialState,
  setFilter: (filter) => set({ filter }),
  setPagination: (pagination) => set({ pagination }),
}));

export default useWidgetStore;
