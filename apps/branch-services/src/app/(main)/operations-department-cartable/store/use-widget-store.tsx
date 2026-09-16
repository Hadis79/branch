import { create } from 'zustand';
import { MessageModel, PaginationState } from '@branch-services/types';
import { PageKind, RequestStatusButton } from '../utils/consts';

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
  pageKind: PageKind;
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
  setPageKind: (kind: PageKind) => void;
};

export type State = FormValues & PaginationState;

const initialState: State = {
  error: null,
  filter: {},
  pageKind: PageKind.HISTORY,
  transactionKeys: {},
  modalType: null,
  record: null,
  message: null,
  downloadErrorMessage: null,
  statusRequest: RequestStatusButton.DEFAULT,
  pagination: {
    size: 10,
    page: 1,
    count: 0,
    current: 0,
  },
};

const operationsDepartmentCartableStore = create<State & Actions>()((set) => ({
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
  setPageKind: (pageKind: PageKind) => set({ pageKind }),
}));

const useOperationsDepartmentCartableStore = () => operationsDepartmentCartableStore((state) => state);
export default useOperationsDepartmentCartableStore;
