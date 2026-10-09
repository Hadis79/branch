import { useRouter } from 'next/navigation';

import { useTr } from '@branch-services/translation';
import { Button } from '@branch-services/ui-kit';

import NewDutyButton from './new-duty-button';
import useEmptyDutyList from '../../hooks/use-empty-duty-list';
import useDutyPage from '../../hooks/use-duty-page';
import { DutyPage } from '../../utils/constants';

const BackButton = () => {
  const [t] = useTr();
  const router = useRouter();

  return (
    <Button type='link' iconPosition='end' onClick={() => router.back()}>
      {t('button.return')}
      <i className='ri-arrow-left-line' />
    </Button>
  );
};

// The list's create button (hidden while the list is empty: the empty state has its own), and the
// affected units page's back button; the create page has none
const HeaderAction = () => {
  const { currentPage } = useDutyPage();
  const isEmptyList = useEmptyDutyList(currentPage === DutyPage.LIST);

  if (currentPage === DutyPage.AFFECTED_UNITS) return <BackButton />;
  if (currentPage === DutyPage.LIST && !isEmptyList) return <NewDutyButton />;

  return null;
};

export default HeaderAction;
