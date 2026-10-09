import { useTr } from '@branch-services/translation';
import { Button } from '@branch-services/ui-kit';

import useServiceAccessScopePage from '../../hooks/use-service-access-scope-page';
import { ServiceAccessScopePage } from '../../utils/constants';

// Opens the create page; shown in the header, or in the empty state while there is nothing yet
const NewScopeButton = () => {
  const [t] = useTr();
  const { navigateTo } = useServiceAccessScopePage();

  return (
    <Button
      style={{ width: 'fit-content' }}
      type='primary'
      icon={<i className='ri-add-line' />}
      iconPosition='start'
      onClick={() => navigateTo(ServiceAccessScopePage.CREATE)}
    >
      {t('new_scope')}
    </Button>
  );
};

export default NewScopeButton;
