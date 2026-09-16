import { create } from 'zustand';
import {
  OrganizationCodeFormValues,
  OrganizationCodeFilters,
  OrganizationCodeMessage,
  OrganizationCodeModal,
  OrganizationCodePagination,
  OrganizationCodeResponseDto,
  OrganizationCodeView,
} from '../utils/types';

interface State {
  view: OrganizationCodeView;
  filter: OrganizationCodeFilters;
  pagination: OrganizationCodePagination;
  draft: OrganizationCodeFormValues | null;
  createdRecord: OrganizationCodeResponseDto | null;
  selectedRecord: OrganizationCodeResponseDto | null;
  activeModal: OrganizationCodeModal;
  message: OrganizationCodeMessage | null;
}

interface Actions {
  setView: (view: OrganizationCodeView) => void;
  setFilter: (filter: OrganizationCodeFilters) => void;
  setPagination: (pagination: Partial<OrganizationCodePagination>) => void;
  setDraft: (draft: OrganizationCodeFormValues | null) => void;
  setCreatedRecord: (createdRecord: OrganizationCodeResponseDto | null) => void;
  setMessage: (message: OrganizationCodeMessage | null) => void;
  openModal: (modal: Exclude<OrganizationCodeModal, null>, record: OrganizationCodeResponseDto) => void;
  closeModal: () => void;
  startCreate: () => void;
  returnToList: () => void;
  resetAll: () => void;
}

const initialState: State = {
  view: 'list',
  filter: {},
  pagination: { page: 1, size: 10 },
  draft: null,
  createdRecord: null,
  selectedRecord: null,
  activeModal: null,
  message: null,
};

const useOrganizationCodeStore = create<State & Actions>()((set) => ({
  ...initialState,
  setView: (view) => set({ view }),
  setFilter: (filter) =>
    set((state) => ({
      filter,
      pagination: { ...state.pagination, page: 1 },
    })),
  setPagination: (pagination) => set((state) => ({ pagination: { ...state.pagination, ...pagination } })),
  setDraft: (draft) => set({ draft }),
  setCreatedRecord: (createdRecord) => set({ createdRecord }),
  setMessage: (message) => set({ message }),
  openModal: (activeModal, selectedRecord) => set({ activeModal, selectedRecord, message: null }),
  closeModal: () => set({ activeModal: null, selectedRecord: null }),
  startCreate: () =>
    set({
      view: 'create-form',
      draft: null,
      createdRecord: null,
      selectedRecord: null,
      activeModal: null,
      message: null,
    }),
  returnToList: () =>
    set({
      view: 'list',
      draft: null,
      createdRecord: null,
      selectedRecord: null,
      activeModal: null,
    }),
  resetAll: () => set({ ...initialState }),
}));

export default useOrganizationCodeStore;
