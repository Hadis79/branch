import { MessageModel } from '@branch-services/types';
import { create } from 'zustand';
import { TransactionKeys } from '@branch-services/components';
import { PageKind, RequestStatus, StepRoute } from '../utils/enums';

export type FormValues = {
  formValues: Partial<{
    ssn: string;
    id: string;
  }>;
  filter: Partial<{
    accountNumber: string;
    ssn: string;
    fromDate: string;
    toDate: string;
    fromAmount: number;
    toAmount: number;
    requestStatus: string;
    paymentType: string;
    traceNumber: string;
    count: number;
    purpose: string;
  }>;
  downloadErrorMessage: any;
  fileDetailsFilter: any;
  error: null;
  transactionModal?: boolean;
  transactionKeys: TransactionKeys | null;
  message: MessageModel | null;
  pageKind: PageKind;
  step: StepRoute | null;
  validateResponse: any;
  checkValidationResponse: any;
  historyData: any;
  showFileDetailsTable: boolean;
  openTransactionDetails: boolean;
  statusRequest: RequestStatus;
};

type PaginationState = {
  pagination: {
    size: number;
    page: number;
    count: number;
    current: number;
  };
};

type Actions = {
  setFilter: (filter: FormValues['filter']) => void;
  setPagination: (pagination: PaginationState['pagination']) => void;
  setFormValues: (formValues: any) => void;
  resetDownloadErrorMessage: () => void;
  setDownloadErrorMessage: (downloadErrorMessage: any) => void;
  setMessage: (message: any) => void;
  resetMessage: () => void;
  resetFilter: () => void;
  resetFileDetailsFilter: () => void;
  setTransactionKeys: (data: TransactionKeys) => void;
  setStep: (step: StepRoute) => void;
  setPageKind: (kind: PageKind) => void;
  setValidateResponse: (validateResponse) => void;
  setCheckValidationResponse: (checkValidationResponse) => void;
  setHistoryData: (historyData) => void;
  showFileDetailsTableAction: (showFileDetailsTable: boolean) => void;
  setRequestStatus: (statusRequest: RequestStatus) => void;
  resetRequestStatus: () => void;
  resetAll: () => void;
  setFileDetailsFilter: (fileDetailsFilter: any) => void;
  resetPagination: () => void;
  setOpenTransactionDetails: (openTransactionDetails: boolean) => void;
};

export type State = FormValues & PaginationState;

const initialState: State = {
  error: null,
  filter: {},
  fileDetailsFilter: {},
  message: null,
  transactionKeys: null,
  transactionModal: false,
  formValues: {
    ssn: '',
    id: '',
  },
  pagination: {
    size: 10,
    page: 0,
    count: 0,
    current: 0,
  },
  pageKind: PageKind.HISTORY,
  step: StepRoute.VALIDATION_STEP,
  validateResponse: {},
  checkValidationResponse: {},
  historyData: {},
  downloadErrorMessage: null,
  showFileDetailsTable: false,
  openTransactionDetails: false,
  statusRequest: RequestStatus.DEFAULT,
};

const useNewRequestsWidgetStore = create<State & Actions>()((set) => ({
  ...initialState,
  setFilter: (filter) => set({ filter }),
  setFileDetailsFilter: (fileDetailsFilter) => set({ fileDetailsFilter }),
  resetFilter: () => set({ filter: { ...initialState.filter } }),
  resetFileDetailsFilter: () => set({ fileDetailsFilter: { ...initialState.fileDetailsFilter } }),
  setTransactionKeys: (transactionKeys: TransactionKeys) => set({ transactionKeys }),
  setOpenTransactionModal: (transactionModal) => set({ transactionModal }),
  setMessage: (message) => set({ message }),
  resetMessage: () => set({ message: null }),
  setValidateResponse: (validateResponse) => set({ validateResponse }),
  setPagination: (pagination) =>
    set((state) => ({
      pagination: {
        ...state.pagination,
        ...pagination,
      },
    })),
  setDownloadErrorMessage: (downloadErrorMessage) => set({ downloadErrorMessage }),
  resetDownloadErrorMessage: () => set({ downloadErrorMessage: null }),
  setHistoryData: (historyData) => set({ historyData }),
  showFileDetailsTableAction: (showFileDetailsTable) => set({ showFileDetailsTable }),
  setStep: (step) => set({ step }),
  setPageKind: (pageKind: PageKind) => set({ pageKind }),
  setCheckValidationResponse: (checkValidationResponse) => set({ checkValidationResponse }),
  setFormValues: (formValues) =>
    set((state) => ({
      formValues: { ...state.formValues, ...formValues },
    })),
  resetRequestStatus: () => set({ statusRequest: RequestStatus.DEFAULT }),
  setRequestStatus: (statusRequest) => set({ statusRequest }),
  resetAll: () => set({ ...initialState }),
  resetPagination: () => set({ pagination: { ...initialState.pagination } }),
  setOpenTransactionDetails: (openTransactionDetails) => set({ openTransactionDetails }),
}));

export default useNewRequestsWidgetStore;
