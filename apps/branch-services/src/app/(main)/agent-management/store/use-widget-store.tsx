import { MessageModel, PaginationState } from '@branch-services/types';
import { create } from 'zustand';
import { StepRoute } from '../utils/enums';
import { AgentResponseDto, SsnInfo } from '../utils/types';

export type FormValues = {
  filter: Partial<{
    ssn: string;
  }>;
  error: null;
  step: StepRoute;
  message?: MessageModel | null;
  formValues: Partial<{
    userSsn: string;
    orgSsn: string;
  }>;
  userInfo: SsnInfo | null;
  orgInfo: any;
  agentResponse: AgentResponseDto | null;
};

type Actions = {
  setFilter: (filter: FormValues['filter']) => void;
  setPagination: (pagination: PaginationState['pagination']) => void;
  setStep: (step: StepRoute) => void;
  setMessage: (message) => void;
  setFormValues: (formValues: any) => void;
  setUserInfo: (userInfo: SsnInfo) => void;
  setOrgInfo: (userInfo: SsnInfo) => void;
  resetMessage: () => void;
  setAgentResponse: (agentResponse: AgentResponseDto) => void;
  resetAll: () => void;
};

export type State = FormValues & PaginationState;

const initialState: State = {
  error: null,
  filter: {},
  pagination: {
    size: 10,
    page: 1,
    count: 0,
    current: 0,
  },
  formValues: {},
  userInfo: null,
  orgInfo: null,
  step: StepRoute.NATIONAL_ID,
  message: null,
  agentResponse: null,
};

const useAgentManagementWidgetStore = create<State & Actions>()((set) => ({
  ...initialState,
  setFilter: (filter) => set({ filter }),
  resetMessage: () => set({ message: null }),
  setPagination: (pagination) => set({ pagination }),
  setStep: (step) => set({ step }),
  setMessage: (message: MessageModel) => set({ message }),
  setUserInfo: (userInfo) => set({ userInfo }),
  setOrgInfo: (orgInfo) => set({ orgInfo }),
  setFormValues: (formValues) =>
    set((state) => ({
      formValues: { ...state.formValues, ...formValues },
    })),
  resetAll: () => set({ ...initialState }),
  setAgentResponse: (data) => set({ agentResponse: data }),
}));

export default useAgentManagementWidgetStore;
