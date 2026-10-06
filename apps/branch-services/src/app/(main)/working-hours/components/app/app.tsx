import ExceptionForm from '../exception-form/exception-form';
import CreateWorkingHours from '../working-hours-form/create-working-hours';
import EditWorkingHours from '../working-hours-form/edit-working-hours';
import WorkingHoursList from '../working-hours-list/working-hours-list';
import WorkingHoursMessage from '../working-hours-message/working-hours-message';
import useWorkingHoursPage from '../../hooks/use-working-hours-page';
import useWorkingHoursStore from '../../store/use-widget-store';
import { WorkingHoursPage } from '../../utils/constants';

const PAGE_COMPONENTS: Partial<Record<WorkingHoursPage, () => JSX.Element | null>> = {
  [WorkingHoursPage.CREATE]: CreateWorkingHours,
  [WorkingHoursPage.EDIT]: EditWorkingHours,
  [WorkingHoursPage.ADD_EXCEPTION]: ExceptionForm,
};

const App = () => {
  const { currentPage } = useWorkingHoursPage();
  const message = useWorkingHoursStore((state) => state.message);
  const setMessage = useWorkingHoursStore((state) => state.setMessage);
  const CurrentPage = PAGE_COMPONENTS[currentPage] ?? WorkingHoursList;

  return (
    <>
      {message && (
        <WorkingHoursMessage message={message} closable margin='2.4rem 3.2rem 0' onClose={() => setMessage(null)} />
      )}
      <CurrentPage />
    </>
  );
};

export default App;
