import { useRouter } from 'next/navigation';

import { useTr } from '@branch-services/translation';
import { Button } from '@branch-services/ui-kit';

import NewScopeButton from './new-scope-button';
import useEmptyScopeList from '../../hooks/use-empty-scope-list';
import useServiceAccessScopePage from '../../hooks/use-service-access-scope-page';
import { ServiceAccessScopePage } from '../../utils/constants';

const BackButton = () => {
  const [t] = useTr();
  const router = useRouter();

  return (
    <Button type='link' icon={<i className='ri-arrow-left-line' />} iconPosition='end' onClick={() => router.back()}>
      {t('button.return')}
    </Button>
  );
};

// The list's create button (hidden while the list is empty: the empty state has its own), and the
// affected units page's back button; the create page has none
const HeaderAction = () => {
  const { currentPage } = useServiceAccessScopePage();
  const isEmptyList = useEmptyScopeList(currentPage === ServiceAccessScopePage.LIST);

  if (currentPage === ServiceAccessScopePage.AFFECTED_UNITS) return <BackButton />;
  if (currentPage === ServiceAccessScopePage.LIST && !isEmptyList) return <NewScopeButton />;

  return null;
};

export default HeaderAction;
