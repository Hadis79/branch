import { create } from 'zustand';

type State = {
  widgetName: number;
};

type Actions = {
  setWidgetName: (name: number) => void;
};

const initialState: State = {
  widgetName: 0,
};

// Zustand store setup
const useGlobalStore = create<State & Actions>()((set) => ({
  ...initialState,
  setWidgetName: (name) => set({ widgetName: name }),
}));

export default useGlobalStore;
