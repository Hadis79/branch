'use client';

import { create, useStore } from 'zustand';
import { PaymentType, RequestStatus } from '../utils/consts';
import { DeepPartial, LocalStorageKey, MessageModel, Obj } from '@branch-services/types';
import { UploadResponse, withdrawalTypesEnum } from '../utils/types';
import { logger } from './logger';
import { createContext, useRef, useContext, ReactNode } from 'react';
import { storage } from '@branch-services/utils';
import { useLocalStorage } from '@branch-services/hooks';

export interface WidgetStoreProviderProps {
  children: ReactNode;
}

export type FormValues = {
  purposes: [];
  message?: MessageModel | null;
  openInfoModal?: boolean;
  activeStep: number;
  activeWithdrawalType: withdrawalTypesEnum | null;
  formValues: DeepPartial<{
    ssn: string;
    accountNumber: string;
    accountOwnerName: string;
    accountBranchCode: string;
    branchCode: number;
    availableBalance: number;
    withdrawalId: string;
    paymentId: string;
    depositDescription: string;
    description: string;
  }>;
  uploadFileForm: DeepPartial<{
    allowSplitPaya: boolean;
    paymentType: PaymentType;
    statement: { label: string; value: string } | null;
    file?: File;
  }>;
  statusRequest?: RequestStatus;
  uploadResponse?: UploadResponse | Obj | undefined;
  cancelUpload: boolean;
};

type Actions = {
  setPurposes: (purposes) => void;
  setFormValues: (formValues: FormValues['formValues']) => void;
  setActiveStep: (activeStep: number) => void;
  setActiveWithdrawalType: (activeWithdrawalType: withdrawalTypesEnum | null) => void;
  resetRequestStatus: () => void;
  resetFormValues: () => void;
  resetUploadFileForm: () => void;
  setCancelUpload: () => void;
  resetField: (field: keyof FormValues['uploadFileForm']) => void;
  setUploadResponse: (response: UploadResponse) => void;
  setMessage: (message) => void;
  resetMessage: () => void;
  setRequestStatus: (statusRequest: RequestStatus) => void;
  setOpenInfoModal: (open?: boolean) => void;
  reset: () => void;
  setUploadFormValues: (uploadValues: FormValues['uploadFileForm']) => void;
};

export type State = FormValues;

const initialState: State = {
  purposes: JSON.parse(storage.getItem(LocalStorageKey.PURPOSES) as string) ?? null,
  message: null,
  openInfoModal: false,
  activeStep: 0,
  activeWithdrawalType: null,
  formValues: {
    ssn: '',
    accountNumber: '',
    accountBranchCode: '',
    branchCode: undefined,
    availableBalance: undefined,
    withdrawalId: '',
    paymentId: '',
    depositDescription: '',
    description: '',
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
};

const useWidgetStoreInternal = create<State & Actions>()(
  logger(
    (set, get) => ({
      ...initialState,

      setFormValues: (formValues) =>
        set((state) => ({
          formValues: { ...state.formValues, ...formValues },
        })),
      setUploadResponse: (response) => set({ uploadResponse: response }),
      resetRequestStatus: () => set({ statusRequest: RequestStatus.DEFAULT }),
      setCancelUpload: () => set({ cancelUpload: true, uploadResponse: undefined }),
      resetFormValues: () => set({ formValues: { ...initialState.formValues } }),
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
      setRequestStatus: (statusRequest) => set({ statusRequest }),
      setMessage: (message) => set({ message }),
      resetMessage: () => set({ message: null }),
      setOpenInfoModal: (open) => set({ openInfoModal: open }),
      reset: () => set({ ...initialState }),
      setPurposes: (purposes) => set({ purposes }),
    }),
    'batch-request-widgetStore'
  )
);

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
