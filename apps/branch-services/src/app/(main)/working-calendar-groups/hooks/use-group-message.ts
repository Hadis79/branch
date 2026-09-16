import { useCallback } from 'react';

import { useTr } from '@branch-services/translation';
import { ApiUtil } from '@branch-services/utils';

import useGroupStore from '../store/use-widget-store';

// Single entry point for the message box shown above the module pages.
const useGroupMessage = () => {
  const [t] = useTr();
  const setMessage = useGroupStore((state) => state.setMessage);
  const resetMessage = useGroupStore((state) => state.resetMessage);

  // Translated when shown so interpolated values (e.g. the group name) are kept in the text
  const showSuccess = useCallback(
    (key: string, params?: Record<string, string | number>) =>
      setMessage({ txt: t(key, params), type: 'success', shouldTranslate: false }),
    [setMessage, t]
  );

  const showError = useCallback(
    (error: unknown) => {
      const message = ApiUtil.getErrorMessage(error);
      if (message) setMessage(message);
    },
    [setMessage]
  );

  return { showSuccess, showError, resetMessage };
};

export default useGroupMessage;
