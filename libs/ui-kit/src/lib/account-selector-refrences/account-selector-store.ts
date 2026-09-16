import { create } from 'zustand';
import { AccountSelectorType } from './account-selector-type';

interface State {
  selectedAccount: AccountSelectorType | null;
}
type Actions = {
  setSelectedAccount: (selectedAccount: AccountSelectorType | null) => void;
};

const initialState: State = {
  selectedAccount: null,
};

const useAccountSelectorStore = create<State & Actions>()((set) => ({
  ...initialState,
  setSelectedAccount: (selectedAccount: AccountSelectorType | null) => set({ selectedAccount }),
}));

export default useAccountSelectorStore;
