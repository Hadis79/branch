import { MessageModel } from '@branch-services/types';
import { create } from 'zustand';

// Only state shared between pages lives here; single-component state stays local.
type State = {
  // Set by the create form / edit modal, shown on the list page after navigating back
  message: MessageModel | null;
};

type Actions = {
  setMessage: (message: MessageModel | null) => void;
  resetAll: () => void;
};

const initialState: State = {
  message: null,
};

const useWorkingHoursStore = create<State & Actions>()((set) => ({
  ...initialState,
  setMessage: (message) => set({ message }),
  resetAll: () => set(initialState),
}));

export default useWorkingHoursStore;
