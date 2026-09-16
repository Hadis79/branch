'use client';

import { create, useStore } from 'zustand';
import { PaymentType, RequestStatus } from '../utils/consts';
import { DeepPartial, LocalStorageKey, MessageModel, Obj } from '@branch-services/types';
import {
  BankUnitsResponse,
  CreateRequestResponse,
  TransactionKeys,
  UploadResponse,
  withdrawalTypesEnum,
} from '../utils/types';
import { logger } from './logger';
import { createContext, useRef, useContext, ReactNode } from 'react';
import { useLocalStorage } from '@branch-services/hooks';
import { registerDelegationStateReset } from '../../../../lib/delegation-state-reset';

export interface WidgetStoreProviderProps {
  children: ReactNode;
}

export type FormValues = {
  purposes: any[] | null;
  message?: MessageModel | null;
  openInfoModal?: boolean;
  bankUnitsResponse: any;
  validateResponse: any;
  openNewRequestSheet: boolean;
  CreateRequestResponse: any;
  transactionKeys: TransactionKeys | null;
  checkValidationResponse: any;
  fileDetailsFilter: any;
  activeStep: number;
  activeWithdrawalType: withdrawalTypesEnum | null;
  showFileDetailsTable: boolean;
  formValues: DeepPartial<{
    ssn: string;
    accountNumber: string;
    accountOwnerName: string;
    accountBranchCode: string;
    branchCode: string;
    balance: number;
    withdrawalId: string;
    paymentId: string;
    depositDescription: string;
    description: string;
    validate: boolean;
  }>;
  uploadFileForm: DeepPartial<{
    allowSplitPaya: boolean;
    paymentType: PaymentType;
    statement: { label: string; value: string } | null;
    file?: File;
  }>;
  statusRequest?: RequestStatus;
  uploadResponse?: UploadResponse | Obj | undefined | any;
  cancelUpload: boolean;
  validate: boolean;
  clientSsn2: string | null;
  evictCache: boolean;
  openFinalConfirmationStep: boolean;
  checkValidationStatus: number | undefined;
  openDraft: boolean;
  balance: number;
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
  setPurposes: (purposes) => void;
  setPagination: (pagination: PaginationState['pagination']) => void;
  resetPagination: () => void;
  setFormValues: (formValues: FormValues['formValues']) => void;
  setActiveStep: (activeStep: number) => void;
  setActiveWithdrawalType: (activeWithdrawalType: withdrawalTypesEnum | null) => void;
  resetRequestStatus: () => void;
  resetFileDetailsFilter: () => void;
  setFileDetailsFilter: (fileDetailsFilter: any) => void;
  resetFormValues: () => void;
  resetUploadFileForm: () => void;
  resetUploadResponse: () => void;
  setCancelUpload: () => void;
  resetField: (field: keyof FormValues['uploadFileForm']) => void;
  setUploadResponse: (response: UploadResponse) => void;
  showFileDetailsTableAction: (showFileDetailsTable: boolean) => void;
  setTransactionKeys: (data: TransactionKeys) => void;
  setMessage: (message) => void;
  setCheckValidationResponse: (checkValidationResponse) => void;
  resetActiveWithdrawalType: () => void;
  setValidateResponse: (validateResponse) => void;
  setBankUnitsResponse: (response: BankUnitsResponse) => void;
  setCreateRequestResponse: (response: CreateRequestResponse | undefined) => void;
  setValidate: (validate) => void;
  setOpenNewRequestSheet: (openNewRequestSheet) => void;
  resetMessage: () => void;
  resetValidate: () => void;
  setRequestStatus: (statusRequest: RequestStatus) => void;
  setEvictCache: (evictCache) => void;
  setOpenInfoModal: (open?: boolean) => void;
  reset: () => void;
  setUploadFormValues: (uploadValues: FormValues['uploadFileForm']) => void;
  setOpenFinalConfirmationStep: (openFinalConfirmationStep) => void;
  setCheckValidationStatus: (checkValidationStatus) => void;
  setOpenDraft: (openDraft) => void;
  setBalance: (balance) => void;
};

export type State = FormValues & PaginationState;

const initialState: State = {
  purposes: null,
  clientSsn2: null,
  message: null,
  openNewRequestSheet: false,
  openDraft: false,
  openInfoModal: false,
  activeStep: 0,
  bankUnitsResponse: undefined,
  fileDetailsFilter: {},
  transactionKeys: null,
  activeWithdrawalType: null,
  validateResponse: {},
  CreateRequestResponse: undefined,
  checkValidationResponse: {},
  pagination: {
    size: 10,
    page: 0,
    count: 0,
    current: 0,
  },
  showFileDetailsTable: false,
  formValues: {
    ssn: '',
    accountNumber: '',
    accountBranchCode: '',
    branchCode: undefined,
    balance: undefined,
    withdrawalId: '',
    paymentId: '',
    depositDescription: '',
    description: '',
    validate: false,
  },
  uploadFileForm: {
    allowSplitPaya: false,
    paymentType: PaymentType.PAYA,
    statement: null,
    file: undefined,
  },
  statusRequest: RequestStatus.DEFAULT,
  uploadResponse: undefined,
  cancelUpload: false,
  validate: false,
  evictCache: false,
  openFinalConfirmationStep: false,
  checkValidationStatus: undefined,
  balance: 0,
};

const useWidgetStoreInternal = create<State & Actions>()(
  logger(
    (set, get) => ({
      ...initialState,

      setFormValues: (formValues) =>
        set((state) => ({
          formValues: { ...state.formValues, ...formValues },
        })),
      setPagination: (pagination) =>
        set((state) => ({
          pagination: {
            ...state.pagination,
            ...pagination,
          },
        })),
      setFileDetailsFilter: (fileDetailsFilter) => set({ fileDetailsFilter }),
      resetFileDetailsFilter: () => set({ fileDetailsFilter: { ...initialState.fileDetailsFilter } }),
      setUploadResponse: (response) => set({ uploadResponse: response }),
      setTransactionKeys: (transactionKeys: TransactionKeys) => set({ transactionKeys }),
      setCheckValidationResponse: (checkValidationResponse) => set({ checkValidationResponse }),
      resetRequestStatus: () => set({ statusRequest: RequestStatus.DEFAULT }),
      resetUploadResponse: () => set({ uploadResponse: undefined }),
      setCancelUpload: () => set({ cancelUpload: true, uploadResponse: undefined }),
      resetFormValues: () => set({ formValues: { ...initialState.formValues } }),
      setValidateResponse: (validateResponse) => set({ validateResponse }),
      setOpenFinalConfirmationStep: (openFinalConfirmationStep) => set({ openFinalConfirmationStep }),
      showFileDetailsTableAction: (showFileDetailsTable) => set({ showFileDetailsTable }),
      resetUploadFileForm: () => set({ uploadFileForm: { ...initialState.uploadFileForm } }),
      resetField: (field: keyof FormValues['uploadFileForm']) =>
        set((state) => ({
          uploadFileForm: {
            ...state.uploadFileForm,
            [field]: initialState.uploadFileForm[field],
          },
        })),
      setUploadFormValues: (uploadValues) =>
        set((state) => ({
          uploadFileForm: { ...state.uploadFileForm, ...uploadValues },
        })),
      setActiveStep: (activeStep) => set({ activeStep }),
      setActiveWithdrawalType: (activeWithdrawalType) => set({ activeWithdrawalType }),
      resetActiveWithdrawalType: () => set({ activeWithdrawalType: null }),
      setRequestStatus: (statusRequest) => set({ statusRequest }),
      setEvictCache: (evictCache) => set({ evictCache }),
      setOpenNewRequestSheet: (openNewRequestSheet) => set({ openNewRequestSheet }),
      setMessage: (message) => set({ message }),
      setBalance: (balance) => set({ balance }),
      resetPagination: () => set({ pagination: { ...initialState.pagination } }),
      setValidate: (validate) => set({ validate }),
      setCreateRequestResponse: (response) => set({ CreateRequestResponse: response }),
      resetValidate: () => set({ validate: false }),
      setBankUnitsResponse: (response) => set({ bankUnitsResponse: response }),
      resetMessage: () => set({ message: null }),
      setCheckValidationStatus: (checkValidationStatus) => ({ checkValidationStatus }),
      setOpenInfoModal: (open) => set({ openInfoModal: open }),
      reset: () => set({ ...initialState }),
      setPurposes: (purposes) => set({ purposes }),
      setOpenDraft: (openDraft) => set({ openDraft }),
    }),
    'batch-request-widgetStore'
  )
);

registerDelegationStateReset(() => useWidgetStoreInternal.getState().reset());

export type WidgetStoreApi = typeof useWidgetStoreInternal;

export const WidgetStoreContext = createContext<WidgetStoreApi | undefined>(undefined);

export const WidgetStoreProvider = ({ children }: WidgetStoreProviderProps) => {
  const storeRef = useRef<WidgetStoreApi>();
  if (!storeRef.current) {
    storeRef.current = useWidgetStoreInternal;
  }

  return <WidgetStoreContext.Provider value={storeRef.current}>{children}</WidgetStoreContext.Provider>;
};
const useWidgetStore = <T,>(selector: (state: State & Actions) => T): T => {
  const store = useContext(WidgetStoreContext);
  if (!store) {
    throw new Error('useWidgetStore must be used within a WidgetStoreProvider');
  }
  return useStore(store, selector);
};

export const usePurposeInLocalStorage = () => {
  const [_, setPurposesLocalStorage] = useLocalStorage(LocalStorageKey.PURPOSES);
  const { setPurposes } = useWidgetStore((state) => state);
  function setPurposesAction(data) {
    setPurposes(data);
    setPurposesLocalStorage(data);
  }

  return {
    setPurposesAction,
  };
};

export default useWidgetStore;
