import WorkingHoursForm from '../working-hours-form/working-hours-form';
import WorkingHoursList from '../working-hours-list/working-hours-list';
import useWorkingHoursPage from '../../hooks/use-working-hours-page';
import { WorkingHoursPage } from '../../utils/constants';

const App = () => {
  const { currentPage } = useWorkingHoursPage();

  if (currentPage === WorkingHoursPage.CREATE) return <WorkingHoursForm />;
  return <WorkingHoursList />;
};

export default App;
