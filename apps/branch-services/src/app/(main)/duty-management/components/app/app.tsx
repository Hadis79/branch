import { useEffect } from 'react';

import AffectedUnits from '../affected-units/affected-units';
import DutyForm from '../duty-form/duty-form';
import DutyList from '../duty-list/duty-list';
import DutyMessage from '../duty-message/duty-message';
import useDutyPage from '../../hooks/use-duty-page';
import useDutyStore from '../../store/use-widget-store';
import { DutyPage } from '../../utils/constants';

const PAGE_COMPONENTS: Record<DutyPage, () => JSX.Element | null> = {
  [DutyPage.LIST]: DutyList,
  [DutyPage.CREATE]: DutyForm,
  [DutyPage.AFFECTED_UNITS]: AffectedUnits,
};

const App = () => {
  const { currentPage } = useDutyPage();
  const message = useDutyStore((state) => state.message);
  const setMessage = useDutyStore((state) => state.setMessage);
  const setDraft = useDutyStore((state) => state.setDraft);
  const CurrentPage = PAGE_COMPONENTS[currentPage];

  // The create page's draft only outlives a visit to the affected units page, not a return to the list
  useEffect(() => {
    if (currentPage === DutyPage.LIST) setDraft(null);
  }, [currentPage, setDraft]);

  return (
    <>
      {message && <DutyMessage message={message} closable margin='2.4rem 3.2rem 0' onClose={() => setMessage(null)} />}
      <CurrentPage />
    </>
  );
};

export default App;
