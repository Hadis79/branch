import { MessageModel } from '@branch-services/types';
import { create } from 'zustand';

import type { DutyFormDraft } from '../utils/types';

// Only state shared between pages lives here; single-component state stays local.
type State = {
  // Set by the create form / delete modal / failed requests, shown above the current page
  message: MessageModel | null;
  // The create page's values and preview, kept while the affected units page is open
  draft: DutyFormDraft | null;
};

type Actions = {
  setMessage: (message: MessageModel | null) => void;
  setDraft: (draft: DutyFormDraft | null) => void;
  resetAll: () => void;
};

const initialState: State = {
  message: null,
  draft: null,
};

const useDutyStore = create<State & Actions>()((set) => ({
  ...initialState,
  setMessage: (message) => set({ message }),
  setDraft: (draft) => set({ draft }),
  resetAll: () => set(initialState),
}));

export default useDutyStore;
