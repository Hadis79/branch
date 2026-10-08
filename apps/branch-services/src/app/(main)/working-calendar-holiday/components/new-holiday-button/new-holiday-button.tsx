import { useTr } from '@branch-services/translation';
import { Button } from '@branch-services/ui-kit';

import useHolidayPage from '../../hooks/use-holiday-page';
import { HolidayPage } from '../../utils/constants';

// Shown in the header and in the empty state
const NewHolidayButton = () => {
  const [t] = useTr();
  const { navigateTo } = useHolidayPage();

  return (
    <Button type='primary' icon={<i className='ri-add-line' />} onClick={() => navigateTo(HolidayPage.CREATE)}>
      {t('new_holiday')}
    </Button>
  );
};

export default NewHolidayButton;
