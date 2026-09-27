import GroupForm from '../components/group-form';
import GroupMessage from '../components/group-message';
import UploadDetails from './upload-details';
import { WorkingCalendarGroupPage } from '../utils/constants';
import useWorkingCalendarGroupPage from '../hooks/use-working-calendar-group-page';

const GroupFormPage = () => {
  const { currentPage, formPage, groupId, editMode } = useWorkingCalendarGroupPage();
  const isDetailsPage = currentPage === WorkingCalendarGroupPage.DETAILS;

  return (
    <>
      {!isDetailsPage && <GroupMessage />}
      {/* Keep the form mounted while viewing upload details to preserve its values. */}
      <div hidden={isDetailsPage}>
        <GroupForm
          key={groupId ? `${groupId}:${editMode}` : 'new'}
          variant={formPage === WorkingCalendarGroupPage.EDIT ? 'edit' : 'create'}
        />
      </div>
      {isDetailsPage && <UploadDetails />}
    </>
  );
};

export default GroupFormPage;
