export const DELEGATION_STATE_RESET_EVENT = 'branch-refrences:delegation-state-reset';

type DelegationStateResetter = () => void;

const resetters = new Set<DelegationStateResetter>();

export const registerDelegationStateReset = (reset: DelegationStateResetter) => {
  resetters.add(reset);
  return () => resetters.delete(reset);
};

const resetDelegationState = () => {
  resetters.forEach((reset) => reset());
};

if (typeof window !== 'undefined') {
  window.addEventListener(DELEGATION_STATE_RESET_EVENT, resetDelegationState);
}
