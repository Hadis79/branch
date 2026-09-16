import { create } from 'zustand';
import { MessageModel } from '@branch-services/types';
import { TransactionKeys } from '../utils/types';
import { getLastMonth, getTodayDate } from '@branch-services/utils';

export type FormValues = {
  formValues: Partial<{
    ssn: string;
    id: string;
  }>;
  filter: Partial<{
    accountNumber: string;
    ssn: string;
    fromDate: any;
    toDate: any;
    fromAmount: number;
    toAmount: number;
    requestStatus: string;
    paymentType: string;
    description: string;
    purpose: string;
    traceCode: string;
    requestType: string;
  }>;
  transactionModal?: boolean;
  transactionKeys: TransactionKeys | null;
  error: null;
  downloadErrorMessage: any;
  message: MessageModel | null;
};

export type PaginationState = {
  pagination: {
    size: number;
    page: number;
    count?: number;
    current?: number;
  };
};

type Actions = {
  setFormValues: (formValues: FormValues['formValues']) => void;
  setMessage: (message: MessageModel) => void;
  resetMessage: () => void;
  setDownloadErrorMessage: (downloadErrorMessage: any) => void;
  resetDownloadErrorMessage: () => void;
  setFilter: (filter: FormValues['filter']) => void;
  applyFilter: (filter: FormValues['filter']) => void;
  resetFilter: () => void;
  setPagination: (pagination: PaginationState['pagination']) => void;
  setOpenTransactionModal: (showModal: boolean) => void;
  setTransactionKeys: (data: TransactionKeys) => void;
  resetPagination: () => void;
};

export type State = FormValues & PaginationState;

const initialState: State = {
  error: null,
  message: null,
  transactionKeys: null,
  transactionModal: false,
  downloadErrorMessage: null,
  filter: {
    accountNumber: '',
    ssn: '',
    fromDate: getLastMonth(),
    toDate: getTodayDate(),
    fromAmount: undefined,
    toAmount: undefined,
    requestStatus: '',
    paymentType: '',
    description: '',
  },
  formValues: {
    ssn: '',
    id: '',
  },
  pagination: {
    size: 10,
    page: 1,
    count: 0,
    current: 0,
  },
};

const useBatchAchHistoryStore = create<State & Actions>()((set) => ({
  ...initialState,
  setFilter: (filter) => set({ filter }),
  applyFilter: (filter) =>
    set((state) => ({
      filter,
      pagination: {
        ...state.pagination,
        page: 1,
        count: 0,
        current: 0,
      },
    })),
  resetFilter: () => set({ filter: { ...initialState.filter } }),
  setTransactionKeys: (transactionKeys: TransactionKeys) => set({ transactionKeys }),
  setOpenTransactionModal: (transactionModal) => set({ transactionModal }),
  setMessage: (message) => set({ message }),
  resetMessage: () => set({ message: null }),
  setDownloadErrorMessage: (downloadErrorMessage) => set({ downloadErrorMessage }),
  resetDownloadErrorMessage: () => set({ downloadErrorMessage: null }),
  setPagination: (pagination) =>
    set((state) => ({
      pagination: {
        ...state.pagination,
        ...pagination,
      },
    })),
  setFormValues: (formValues) =>
    set((state) => ({
      formValues: { ...state.formValues, ...formValues },
    })),
  resetPagination: () => set({ pagination: { ...initialState.pagination } }),
}));

export default useBatchAchHistoryStore;
