import { useEffect } from 'react';

import { ApiUtil } from '@branch-services/utils';

import useGroupStore from '../store/use-widget-store';

const useQueryErrorMessage = (error: Error | null) => {
  const messageType = useGroupStore((state) => state.message?.type);
  const setMessage = useGroupStore((state) => state.setMessage);
  const resetMessage = useGroupStore((state) => state.resetMessage);

  useEffect(() => {
    if (error) {
      setMessage(ApiUtil.getErrorMessage(error));
      return;
    }

    if (messageType === 'error') resetMessage();
  }, [error, messageType, resetMessage, setMessage]);
};

export default useQueryErrorMessage;
