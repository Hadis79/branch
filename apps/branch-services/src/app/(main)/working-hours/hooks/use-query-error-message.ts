import { useEffect } from 'react';

import { ApiUtil } from '@branch-services/utils';

import useWorkingHoursStore from '../store/use-widget-store';

const useQueryErrorMessage = (error: unknown) => {
  const setMessage = useWorkingHoursStore((state) => state.setMessage);

  useEffect(() => {
    if (error) setMessage(ApiUtil.getErrorMessage(error));
  }, [error, setMessage]);
};

export default useQueryErrorMessage;
