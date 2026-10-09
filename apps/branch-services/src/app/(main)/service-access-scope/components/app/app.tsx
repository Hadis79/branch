import { useEffect } from 'react';

import AffectedUnits from '../affected-units/affected-units';
import ScopeForm from '../scope-form/scope-form';
import ScopeList from '../scope-list/scope-list';
import ScopeMessage from '../scope-message/scope-message';
import useServiceAccessScopePage from '../../hooks/use-service-access-scope-page';
import useServiceAccessScopeStore from '../../store/use-widget-store';
import { ServiceAccessScopePage } from '../../utils/constants';

const PAGE_COMPONENTS: Record<ServiceAccessScopePage, () => JSX.Element | null> = {
  [ServiceAccessScopePage.LIST]: ScopeList,
  [ServiceAccessScopePage.CREATE]: ScopeForm,
  [ServiceAccessScopePage.AFFECTED_UNITS]: AffectedUnits,
};

const App = () => {
  const { currentPage } = useServiceAccessScopePage();
  const message = useServiceAccessScopeStore((state) => state.message);
  const setMessage = useServiceAccessScopeStore((state) => state.setMessage);
  const setDraft = useServiceAccessScopeStore((state) => state.setDraft);
  const CurrentPage = PAGE_COMPONENTS[currentPage];

  // The create page's draft only outlives a visit to the affected units page, not a return to the list
  useEffect(() => {
    if (currentPage === ServiceAccessScopePage.LIST) setDraft(null);
  }, [currentPage, setDraft]);

  return (
    <>
      {message && <ScopeMessage message={message} closable margin='2.4rem 3.2rem 0' onClose={() => setMessage(null)} />}
      <CurrentPage />
    </>
  );
};

export default App;
