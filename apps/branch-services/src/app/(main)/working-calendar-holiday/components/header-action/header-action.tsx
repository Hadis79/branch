import { useState } from 'react';

import { useTr } from '@branch-services/translation';
import { Button } from '@branch-services/ui-kit';

import CreateMethodModal from '../create-method-modal/create-method-modal';
import useHolidayPage from '../../hooks/use-holiday-page';
import { HolidayPage } from '../../utils/constants';

// List: "new holidays" (asks for the method first); other pages: back
const HolidayHeaderAction = () => {
  const [t] = useTr();
  const { currentPage, navigateTo } = useHolidayPage();
  const [isMethodModalOpen, setIsMethodModalOpen] = useState(false);

  if (currentPage !== HolidayPage.LIST) {
    const backPage = currentPage === HolidayPage.UPLOAD_DETAILS ? HolidayPage.UPLOAD : HolidayPage.LIST;

    return (
      <Button type='link' icon={<i className='ri-arrow-left-line' />} onClick={() => navigateTo(backPage)}>
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
