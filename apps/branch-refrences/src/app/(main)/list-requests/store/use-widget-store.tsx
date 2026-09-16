import { create } from 'zustand';
import { LocalStorageKey, MessageModel } from '@branch-services/types';
import { TransactionKeys } from '../utils/types';
import { useLocalStorage } from '@branch-services/hooks';
import { registerDelegationStateReset } from '../../../../lib/delegation-state-reset';
import { Dayjs } from '@branch-services/utils';

export type FormValues = {
  formValues: Partial<{
    ssn: string;
    id: string;
  }>;
  filter: Partial<{
    accountNumber: string;
    ssn: string;
    fromDate: string | Dayjs;
    toDate: string | Dayjs;
    fromAmount: number;
    toAmount: number;
    requestStatus: string;
    paymentType: string;
    description: string;
    requestType: string;
    depositType: string;
  }>;
  transactionModal?: boolean;
  transactionKeys: TransactionKeys | null;
  error: null;
  downloadErrorMessage: any;
  message: MessageModel | null;
  requestId: string;
  requestType: string;
  purposes: any[] | null;
  status: string;
  openHistoryBottomSheet: boolean;
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
  resetFilter: () => void;
  setPagination: (pagination: PaginationState['pagination']) => void;
  setOpenTransactionModal: (showModal: boolean) => void;
  setTransactionKeys: (data: TransactionKeys) => void;
  setPurposes: (purposes) => void;
  setRequestId: (requestId) => void;
  setRequestType: (requestType) => void;
  setStatus: (status) => void;
  reset: () => void;
  setopenHistoryBottomSheet: (openHistoryBottomSheet) => void;
};

export type State = FormValues & PaginationState;

const initialState: State = {
  error: null,
  message: null,
  requestId: '',
  transactionKeys: null,
  transactionModal: false,
  downloadErrorMessage: null,
  requestType: '',
  filter: {
    accountNumber: '',
    ssn: '',
    fromDate: '',
    toDate: '',
    fromAmount: undefined,
    toAmount: undefined,
    requestStatus: '',
    paymentType: '',
    description: '',
    depositType: '',
    requestType: '',
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
  purposes: null,
  status: '',
  openHistoryBottomSheet: false,
};

const useListRequestStore = create<State & Actions>()((set) => ({
  ...initialState,
  setFilter: (filter) => set({ filter }),
  setPurposes: (purposes) => set({ purposes }),
  setRequestId: (requestId) => set({ requestId }),
  setRequestType: (requestType) => set({ requestType }),
  setopenHistoryBottomSheet: (openHistoryBottomSheet) => set({ openHistoryBottomSheet }),
  setStatus: (status) => set({ status }),
  reset: () => set({ ...initialState }),
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
}));

registerDelegationStateReset(() => useListRequestStore.getState().reset());

export const usePurposeInLocalStorage = () => {
  const [_, setPurposesLocalStorage] = useLocalStorage(LocalStorageKey.PURPOSES);
  const { setPurposes } = useListRequestStore((state) => state);

  function setPurposesAction(data) {
    setPurposes(data);
    setPurposesLocalStorage(data);
  }

  return {
    setPurposesAction,
  };
};

export default useListRequestStore;
