import { useEffect, useRef } from 'react';

import useHolidayStore from '../store/use-widget-store';
import { HolidayPage } from '../utils/constants';

const useHolidayMessage = (currentPage: HolidayPage) => {
  const message = useHolidayStore((state) => state.message);
  const setMessage = useHolidayStore((state) => state.setMessage);
  const previousPage = useRef(currentPage);

  const isFormErrorOnList =
    currentPage === HolidayPage.LIST && previousPage.current !== HolidayPage.LIST && message?.type === 'error';
  const isListSuccessOutsideList = currentPage !== HolidayPage.LIST && message?.type === 'success';
  const shouldClear = isFormErrorOnList || isListSuccessOutsideList;

  useEffect(() => {
    if (shouldClear) setMessage(null);
    previousPage.current = currentPage;
  }, [currentPage, setMessage, shouldClear]);

  return {
    message: shouldClear ? null : message,
    clearMessage: () => setMessage(null),
  };
};

export default useHolidayMessage;
