import { useState, useCallback } from 'react';

const useToggle = (initialState = false) => {
  const [state, setState] = useState<boolean>(initialState);

  const toggle = useCallback((): void => setState((state) => !state), []);

  return [state, toggle] as const;
};

export default useToggle;
