import useHolidayMessage from './use-holiday-message';
import useHolidayPage from './use-holiday-page';
import { HolidayPage } from '../utils/constants';

// Outcome of a create form: success goes back to the list, errors are shown on the form
const useFinishCreate = () => {
  const { navigateTo } = useHolidayPage();
  const { showSuccess, showError } = useHolidayMessage();

  return {
    onSuccess: (messageKey: string) => {
      showSuccess(messageKey);
      navigateTo(HolidayPage.LIST);
    },
    onError: showError,
  };
};

export default useFinishCreate;
