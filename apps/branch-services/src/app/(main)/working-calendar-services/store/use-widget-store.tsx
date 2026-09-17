import { MessageModel } from '@branch-services/types';
import { create } from 'zustand';

import type { ServiceItem, ServiceListFilter, ServiceModalType, ServicePagination } from '../utils/types';

type State = {
  filter: ServiceListFilter;
  pagination: ServicePagination;
  activeModal: ServiceModalType | null;
  // Row being edited (edit modal only)
  selectedService: ServiceItem | null;
  message: MessageModel | null;
};

type Actions = {
  setFilter: (filter: ServiceListFilter) => void;
  setPagination: (pagination: Partial<ServicePagination>) => void;
  openModal: (modal: ServiceModalType, service?: ServiceItem) => void;
  closeModal: () => void;
  setMessage: (message: MessageModel | null) => void;
  resetAll: () => void;
};

const initialState: State = {
  filter: {},
  pagination: { page: 1, size: 10 },
  activeModal: null,
  selectedService: null,
  message: null,
};

const useServiceStore = create<State & Actions>()((set) => ({
  ...initialState,
  setFilter: (filter) => set((state) => ({ filter, pagination: { ...state.pagination, page: 1 } })),
  setPagination: (pagination) => set((state) => ({ pagination: { ...state.pagination, ...pagination } })),
  openModal: (activeModal, selectedService) =>
    set({ activeModal, selectedService: selectedService ?? null, message: null }),
  closeModal: () => set({ activeModal: null, selectedService: null }),
  setMessage: (message) => set({ message }),
  resetAll: () => set(initialState),
}));

export default useServiceStore;
