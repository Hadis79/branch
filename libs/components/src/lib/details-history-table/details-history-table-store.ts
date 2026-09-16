import { create } from 'zustand';
import { DetailsHistoryResponse } from './types';
import { LocalStorageKey, MessageModel } from '@branch-services/types';
import { useLocalStorage } from '@branch-services/hooks';
import { storage } from '@branch-services/utils';

interface Pagination {
  size: number;
  page: number;
  current: number;
}

interface PaginationState {
  pagination: Pagination;
  filter: Partial<{
    destinationAccount?: string;
    ssn?: string;
    id?: string;
    status?: string;
    depositId?: string;
    tranceNumber?: string;
    fromAmount?: string;
    toAmount?: string;
    page?: string;
    size?: string;
  }>;
  detailsHistoryResponse: any;
  downloadErrorMessage: any;
  message: MessageModel | null;
  purposes: [];
}

type Actions = {
  setPagination: (pagination: Pagination) => void;
  setFilter: (filter: PaginationState['filter']) => void;
  resetFilter: () => void;
  setDetailsHistoryResponse: (response: DetailsHistoryResponse) => void;
  resetDownloadErrorMessage: () => void;
  setDownloadErrorMessage: (downloadErrorMessage: any) => void;
  resetMessage: () => void;
  setMessage: (message: MessageModel) => void;
  setPurposes: (purposes) => void;
};

const initialState: PaginationState = {
  pagination: {
    size: 10,
    page: 0,
    current: 1,
  },
  filter: {
    destinationAccount: '',
    ssn: '',
    id: '',
    status: '',
    depositId: '',
    tranceNumber: '',
    fromAmount: '',
    toAmount: '',
    page: '',
    size: '',
  },
  detailsHistoryResponse: undefined,
  downloadErrorMessage: null,
  message: null,
  purposes: JSON.parse(storage.getItem(LocalStorageKey.PURPOSES) as string) ?? null,
};

const useFileDetailsTableStore = create<PaginationState & Actions>((set) => ({
  ...initialState,
  setPagination: (pagination) =>
    set((state) => ({
      pagination: { ...state.pagination, ...pagination },
    })),
  setFilter: (filter) => set({ filter }),
  setDownloadErrorMessage: (downloadErrorMessage) => set({ downloadErrorMessage }),
  setDetailsHistoryResponse: (response) => set({ detailsHistoryResponse: response }),
  resetMessage: () => set({ message: null }),

  resetFilter: () => set({ filter: undefined }),
  resetDownloadErrorMessage: () => set({ downloadErrorMessage: null }),
  setMessage: (message) => set({ message }),
  setPurposes: (purposes) => set({ purposes }),
}));

export const usePagination = () => useFileDetailsTableStore((state) => state.pagination);
export const useSetPagination = () => useFileDetailsTableStore((state) => state.setPagination);
export const usePurposeInLocalStorage = () => {
  const [_, setPurposesLocalStorage] = useLocalStorage(LocalStorageKey.PURPOSES);
  const { setPurposes } = useFileDetailsTableStore((state) => state);

  function setPurposesAction(data) {
    setPurposes(data);
    setPurposesLocalStorage(data);
  }

  return {
    setPurposesAction,
  };
};

export default useFileDetailsTableStore;
