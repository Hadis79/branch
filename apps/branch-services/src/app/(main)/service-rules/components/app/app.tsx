import RuleForm from '../rule-form/rule-form';
import RuleList from '../rule-list/rule-list';
import RuleMessage from '../rule-message/rule-message';
import useServiceRulesPage from '../../hooks/use-service-rules-page';
import useServiceRulesStore from '../../store/use-widget-store';
import { ServiceRulesPage } from '../../utils/constants';

const PAGE_COMPONENTS: Partial<Record<ServiceRulesPage, () => JSX.Element | null>> = {
  [ServiceRulesPage.CREATE]: RuleForm,
};

const App = () => {
  const { currentPage } = useServiceRulesPage();
  const message = useServiceRulesStore((state) => state.message);
  const setMessage = useServiceRulesStore((state) => state.setMessage);
  const CurrentPage = PAGE_COMPONENTS[currentPage] ?? RuleList;

  return (
    <>
      {message && <RuleMessage message={message} closable margin='2.4rem 3.2rem 0' onClose={() => setMessage(null)} />}
      <CurrentPage />
    </>
  );
};

export default App;
