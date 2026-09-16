import GroupForm from '../group-form';
import GroupMessage from '../group-message';
import GroupList from '../../pages/group-list';
import UploadDetails from '../../pages/upload-details';
import { WorkingCalendarGroupPage } from '../../utils/constants';
import useWorkingCalendarGroupPage from '../../hooks/use-working-calendar-group-page';

const App = () => {
  const { currentPage, formPage, groupId } = useWorkingCalendarGroupPage();
  const isDetailsPage = currentPage === WorkingCalendarGroupPage.DETAILS;

  if (currentPage === WorkingCalendarGroupPage.LIST) {
    return (
      <>
        <GroupMessage />
        <GroupList />
      </>
    );
  }

  // Add, edit and the upload details page opened from them.
  // The form stays mounted (hidden) on the details page so its state survives the round trip.
  return (
    <>
      {!isDetailsPage && <GroupMessage />}
      <div hidden={isDetailsPage}>
        <GroupForm key={groupId ?? 'new'} variant={formPage === WorkingCalendarGroupPage.EDIT ? 'edit' : 'create'} />
      </div>
      {isDetailsPage && <UploadDetails />}
    </>
  );
};

export default App;
