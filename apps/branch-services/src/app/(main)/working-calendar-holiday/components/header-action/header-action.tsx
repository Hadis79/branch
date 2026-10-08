import { useTr } from '@branch-services/translation';
import { Button } from '@branch-services/ui-kit';

import NewHolidayButton from '../new-holiday-button/new-holiday-button';
import useEmptyHolidayList from '../../hooks/use-empty-holiday-list';
import useHolidayPage from '../../hooks/use-holiday-page';
import { HolidayPage } from '../../utils/constants';

// List: "new holidays", hidden while the list is empty (the empty state has its own button); other pages: back
const HolidayHeaderAction = () => {
  const [t] = useTr();
  const { currentPage, navigateTo } = useHolidayPage();
  const isEmptyList = useEmptyHolidayList();

  if (currentPage === HolidayPage.LIST) return isEmptyList ? null : <NewHolidayButton />;

  // The upload details page goes back to the create page, which goes back to the list
  const backPage = currentPage === HolidayPage.UPLOAD_DETAILS ? HolidayPage.CREATE : HolidayPage.LIST;

  return (
    <Button type='link' icon={<i className='ri-arrow-left-line' />} onClick={() => navigateTo(backPage)}>
      {t('button.return')}
    </Button>
  );
};

export default HolidayHeaderAction;
