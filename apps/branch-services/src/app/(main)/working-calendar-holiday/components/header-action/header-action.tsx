import { useState } from 'react';

import { useTr } from '@branch-services/translation';
import { Button } from '@branch-services/ui-kit';

import CreateMethodModal from '../create-method-modal/create-method-modal';
import useHolidayPage from '../../hooks/use-holiday-page';
import useHolidayStore from '../../store/use-widget-store';
import { HolidayPage } from '../../utils/constants';

// List: "new holidays" (asks for the method first); other pages: back
const HolidayHeaderAction = () => {
  const [t] = useTr();
  const { currentPage, year, navigateTo } = useHolidayPage();
  const formOrigin = useHolidayStore((state) => state.formOrigin);
  const [isMethodModalOpen, setIsMethodModalOpen] = useState(false);

  if (currentPage !== HolidayPage.LIST) {
    const handleBack = () => {
      const isDetailsPage = currentPage === HolidayPage.DETAILS || currentPage === HolidayPage.UPLOAD_DETAILS;

      if (isDetailsPage && formOrigin === HolidayPage.EDIT && year) {
        navigateTo(HolidayPage.EDIT, { year });
        return;
      }

      if (currentPage === HolidayPage.UPLOAD_DETAILS) {
        navigateTo(HolidayPage.UPLOAD);
        return;
      }

      navigateTo(HolidayPage.LIST);
    };

    return (
      <Button type='link' icon={<i className='ri-arrow-left-line' />} onClick={handleBack}>
        {t('button.return')}
      </Button>
    );
  }

  return (
    <>
      <Button type='primary' icon={<i className='ri-add-line' />} onClick={() => setIsMethodModalOpen(true)}>
        {t('new_holiday')}
      </Button>
      <CreateMethodModal open={isMethodModalOpen} onCancel={() => setIsMethodModalOpen(false)} />
    </>
  );
};

export default HolidayHeaderAction;
