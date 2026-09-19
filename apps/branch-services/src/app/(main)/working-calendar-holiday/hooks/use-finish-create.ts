import { MessageModel } from '@branch-services/types';
import { ApiUtil } from '@branch-services/utils';

import useHolidayPage from './use-holiday-page';
import useHolidayStore from '../store/use-widget-store';
import { HolidayPage, HolidayTab } from '../utils/constants';

// Outcome of a create form: success goes back to the list on the matching tab, errors are shown on the form
const useFinishCreate = (tab: HolidayTab) => {
  const { navigateTo } = useHolidayPage();
  const setMessage = useHolidayStore((state) => state.setMessage);
  const setActiveTab = useHolidayStore((state) => state.setActiveTab);

  return {
    onSuccess: (message: MessageModel) => {
      setMessage(message);
      setActiveTab(tab);
      navigateTo(HolidayPage.LIST);
    },
    onError: (error: unknown) => setMessage(ApiUtil.getErrorMessage(error)),
  };
};

export default useFinishCreate;
