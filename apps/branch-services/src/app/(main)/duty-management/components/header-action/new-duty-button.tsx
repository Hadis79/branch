import { useTr } from '@branch-services/translation';
import { Button } from '@branch-services/ui-kit';

import useDutyPage from '../../hooks/use-duty-page';
import { DutyPage } from '../../utils/constants';

// Opens the create page; shown in the header, or in the empty state while there is nothing yet
const NewDutyButton = () => {
  const [t] = useTr();
  const { navigateTo } = useDutyPage();

  return (
    <Button
      style={{ width: 'fit-content' }}
      type='primary'
      icon={<i className='ri-add-line' />}
      iconPosition='start'
      onClick={() => navigateTo(DutyPage.CREATE)}
    >
      {t('new_duty')}
    </Button>
  );
};

export default NewDutyButton;
