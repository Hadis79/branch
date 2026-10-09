import { useEffect } from 'react';

import { ApiUtil } from '@branch-services/utils';

import useDutyStore from '../store/use-widget-store';

// Shows a failed request's error above the current page
const useQueryErrorMessage = (error: unknown) => {
  const setMessage = useDutyStore((state) => state.setMessage);

  useEffect(() => {
    if (error) setMessage(ApiUtil.getErrorMessage(error));
  }, [error, setMessage]);
};

export default useQueryErrorMessage;
