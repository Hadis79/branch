import HolidayList from '../holiday-list/holiday-list';
import HolidayMessage from '../holiday-message/holiday-message';
import OfficialDetails from '../official-details/official-details';
import UploadForm from '../upload-form/upload-form';
import UploadDetails from '../upload-details/upload-details';
import ManualForm from '../manual-form/manual-form';
import EditOfficialForm from '../edit-official-form/edit-official-form';
import useHolidayPage from '../../hooks/use-holiday-page';
import useHolidayStore from '../../store/use-widget-store';
import { HolidayPage } from '../../utils/constants';

const App = () => {
  const { currentPage } = useHolidayPage();
  const message = useHolidayStore((state) => state.message);
  const setMessage = useHolidayStore((state) => state.setMessage);
  const formOrigin = useHolidayStore((state) => state.formOrigin);
  const isUploadDetails = currentPage === HolidayPage.UPLOAD_DETAILS;
  const isDetails = currentPage === HolidayPage.DETAILS;
  const isFromEdit = (isUploadDetails || isDetails) && formOrigin === HolidayPage.EDIT;

  return (
    <>
      {message && !isUploadDetails && (
        <HolidayMessage
          message={message}
          closable
          shouldScroll
          margin='2.4rem 3.2rem 0'
          onClose={() => setMessage(null)}
        />
      )}
      {currentPage === HolidayPage.LIST && <HolidayList />}
      {isDetails && <OfficialDetails />}
      {currentPage === HolidayPage.MANUAL && <ManualForm />}
      {/* The upload/edit form stays mounted (hidden) on the details page so its state survives the round trip */}
      {(currentPage === HolidayPage.UPLOAD || (isUploadDetails && !isFromEdit)) && (
        <div hidden={isUploadDetails}>
          <UploadForm />
        </div>
      )}
      {(currentPage === HolidayPage.EDIT || isFromEdit) && (
        <div hidden={isUploadDetails || isDetails}>
          <EditOfficialForm />
        </div>
      )}
      {isUploadDetails && <UploadDetails />}
    </>
  );
};

export default App;
