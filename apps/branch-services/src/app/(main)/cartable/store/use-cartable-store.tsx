import { create } from 'zustand';
import { MessageModel, PaginationState } from '@branch-services/types';
import { RequestStatusButton } from '../utils/consts';

type ModalType = 'reject_batch_request' | 'confirm_request' | null;

export type FormValues = {
  filter: Partial<{
    accountNumber: string;
    ssn: string;
    fromAmount: string;
    toAmount: string;
  }>;
  transactionKeys: Partial<{
    ssn: string;
    id: string;
  }>;
  error: null;
  modalType: ModalType;
  record: any;
  message?: MessageModel | null;
  statusRequest: RequestStatusButton;
  downloadErrorMessage: any;
};

type Actions = {
  setFilter: (filter: FormValues['filter']) => void;
  setPagination: (pagination: PaginationState['pagination']) => void;
  resetFilter: () => void;
  setModalType: (modalType: ModalType) => void;
  setRecord: (record: any) => void;
  setMessage: (message) => void;
  resetMessage: () => void;
  setDownloadErrorMessage: (downloadErrorMessage: any) => void;
  resetDownloadErrorMessage: () => void;
  setStatusRequest: (statusRequest: RequestStatusButton) => void;
  setTransactionKeys: (transactionKeys: any) => void;
};

export type State = FormValues & PaginationState;

const initialState: State = {
  error: null,
  filter: {},
  transactionKeys: {},
  modalType: null,
  record: null,
  message: null,
  downloadErrorMessage: null,
  statusRequest: RequestStatusButton.DEFAULT,
  pagination: {
    limit: 10,
    offset: 0,
    count: 0,
    current: 0,
  },
};

const cartableStore = create<State & Actions>()((set) => ({
  ...initialState,
  setTransactionKeys: (transactionKeys) =>
    set((state) => ({
      transactionKeys: { ...state.transactionKeys, ...transactionKeys },
    })),
  setFilter: (filter) => set((state) => ({ filter: { ...state.filter, ...filter } })),
  setPagination: (pagination) => set({ pagination }),
  resetFilter: () => set({ filter: { ...initialState.filter } }),
  setModalType: (modalType) => set({ modalType }),
  setRecord: (record) => set({ record }),
  setDownloadErrorMessage: (downloadErrorMessage) => set({ downloadErrorMessage }),
  resetDownloadErrorMessage: () => set({ downloadErrorMessage: null }),
  setMessage: (message: MessageModel) => set({ message }),
  resetMessage: () => set({ message: null }),
  setStatusRequest: (statusRequest) => set({ statusRequest }),
}));

const useCartableStore = () => cartableStore((state) => state);
export default useCartableStore;
