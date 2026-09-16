import { DeepPartial, PaginationState } from '@branch-services/types';
import { create } from 'zustand';
import { PageKind, RequestStatusButton } from '../utils/consts';
import {
  VerifyResponse,
  OtpResponse,
  captchaResponse,
  ValidateResponse,
  CardListResponse,
  CardOtpResponse,
  CardVerifyResponse,
} from '../utils/types';

export type FormValues = {
  filter: Partial<{
    accountNumber: string;
  }>;
  error: null;
  state: Partial<{
    phoneNumber: string;
    page: string;
    statusRequest: RequestStatusButton;
    current: number;
    errorMessage: Partial<{
      txt: string;
      subErrors: string;
      shouldTranslate: string;
      type: string;
      linkProps: string;
    }> | null;
  }>;
  cancelUpload: boolean | undefined;
  verifyResponse: any;
  cardOtpResponse: any;
  validateResponse: any;
  resetLogin: any;
  captchaResponse: any;
  cardVerifyResponse: any;
  cardResponse: any;
  timer: number | null;
  otpResponse: any;
  message: Partial<{
    txt: string;
    subErrors: string;
    shouldTranslate: string;
    type: string;
    linkProps: string;
  }> | null;
  activeStep: string;
  prevStep: string;
  formValues: DeepPartial<{
    ssn: string;
    phoneNumber: string;
    captcha: string;
    accountNumber: string;
    otp: string;
    cvv2: string;
    password: string;
    panNo: string;
    expDate: string;
  }>;
};

type Actions = {
  setFormValues: (formValues: FormValues['formValues']) => void;
  resetFormValues: () => void;
  setFilter: (filter: FormValues['filter']) => void;
  setPagination: (pagination: PaginationState['pagination']) => void;
  resetErrorMessage: () => void;
  setMessage: (message) => void;
  resetMessage: () => void;
  setActiveStep: (activeStep: string) => void;
  setPrevStep: (prevStep: string) => void;
  // setCancelLogin: () => void;
  setVerifyResponse: (response: VerifyResponse) => void;
  setValidateResponse: (response: ValidateResponse) => void;
  setCardVerifyResponse: (response: CardVerifyResponse) => void;
  setCardListResponse: (response: CardListResponse) => void;
  setCardOtpResponse: (response: CardOtpResponse) => void;
  setCaptchaResponse: (response: captchaResponse) => void;
  setOtpResponse: (response: OtpResponse) => void;
  setResetLogin: (resetLogin) => void;
  setTimer: (timer) => void;
};

export type State = FormValues & PaginationState;

const initialState: State = {
  error: null,
  filter: {},
  pagination: {
    limit: 10,
    offset: 0,
    count: 0,
    current: 0,
  },
  state: {
    phoneNumber: '',
    page: PageKind.SUBMIT_INFORMATION,
  },
  cancelUpload: undefined,
  verifyResponse: undefined,
  validateResponse: undefined,
  cardOtpResponse: undefined,
  captchaResponse: undefined,
  cardVerifyResponse: undefined,
  cardResponse: undefined,
  otpResponse: undefined,
  resetLogin: undefined,
  message: null,
  timer: null,
  activeStep: PageKind.SUBMIT_INFORMATION,
  prevStep: '',
  formValues: {
    ssn: '',
    phoneNumber: '',
    captcha: '',
    accountNumber: '',
    otp: '',
    cvv2: '',
    password: '',
    panNo: '',
    expDate: '',
  },
};

const useWidgetStore = create<State & Actions>()((set) => ({
  ...initialState,
  setActiveStep: (activeStep) =>
    set({
      activeStep,
      message: null,
    }),
  setMessage: (message) => set({ message }),
  resetFormValues: () => set({ formValues: { ...initialState?.formValues } }),
  setFormValues: (formValues) =>
    set((state) => ({
      formValues: { ...state.formValues, ...formValues },
    })),
  setVerifyResponse: (response) => set({ verifyResponse: response }),
  setValidateResponse: (response) => set({ validateResponse: response }),
  setCardOtpResponse: (response) => set({ cardOtpResponse: response }),
  setCardVerifyResponse: (response) => set({ cardVerifyResponse: response }),
  setCaptchaResponse: (response) => set({ captchaResponse: response }),
  setResetLogin: (resetLogin) => set({ resetLogin }),
  setCardListResponse: (response) => set({ cardResponse: response }),
  setOtpResponse: (response) => set({ otpResponse: response }),
  resetMessage: () => set({ message: null }),
  setFilter: (filter) => set({ filter }),
  setTimer: (timer) => set({ timer }),
  setPrevStep: (prevStep) => set({ prevStep }),
  setPagination: (pagination) => set({ pagination }),
  resetErrorMessage: () =>
    set((state) => ({
      state: {
        ...state.state,
        errorMessage: null,
      },
    })),
}));

export default useWidgetStore;
