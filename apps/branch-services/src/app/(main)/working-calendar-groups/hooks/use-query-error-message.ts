import { useEffect, useRef } from 'react';

import useGroupStore from '../store/use-widget-store';
import useGroupMessage from './use-group-message';

// Shows a query's error and clears it once that same query recovers.
// Several queries can be mounted at once, so a query only clears an error it has shown itself.
const useQueryErrorMessage = (error: Error | null) => {
  const messageType = useGroupStore((state) => state.message?.type);
  const { showError, resetMessage } = useGroupMessage();
  const hasShownError = useRef(false);

  useEffect(() => {
    if (error) {
      hasShownError.current = true;
      showError(error);
      return;
    }

    if (!hasShownError.current) return;

    hasShownError.current = false;
    if (messageType === 'error') resetMessage();
  }, [error, messageType, resetMessage, showError]);
};

export default useQueryErrorMessage;
