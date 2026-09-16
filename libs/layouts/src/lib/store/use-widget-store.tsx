import { create } from 'zustand';
import { DelagationResponse, OrganizationResponse } from '../utils/types';

export type FormValues = {
  organizationResponse: any;
  delagationResponse: any;
  activeWithdrawalType: string | null | undefined;
  message: Partial<{
    txt: string;
    subErrors: string;
    shouldTranslate: string;
    type: string;
    linkProps: string;
  }> | null;
};

type Actions = {
  setMessage: (message) => void;
  resetMessage: () => void;
  setActiveWithdrawalType: (activeWithdrawalType: string | null | undefined) => void;
  resetActiveWithdrawalType: () => void;
  setOrganizationResponse: (response: OrganizationResponse) => void;
  setDelagaationResponse: (response: DelagationResponse) => void;
};

export type State = FormValues;

const initialState: State = {
  activeWithdrawalType: null,
  organizationResponse: undefined,
  delagationResponse: undefined,
  message: null,
};

const useWidgetStore = create<State & Actions>()((set) => ({
  ...initialState,
  setMessage: (message) => set({ message }),
  setOrganizationResponse: (response) => set({ organizationResponse: response }),
  setActiveWithdrawalType: (activeWithdrawalType) => set({ activeWithdrawalType }),
  resetActiveWithdrawalType: () => set({ activeWithdrawalType: null }),
  resetMessage: () => set({ message: null }),
  setDelagaationResponse: (response) => set({ delagationResponse: response }),
}));

export default useWidgetStore;
