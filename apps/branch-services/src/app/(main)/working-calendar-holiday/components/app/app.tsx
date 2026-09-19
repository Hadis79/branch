import HolidayList from '../holiday-list/holiday-list';
import HolidayMessage from '../holiday-message/holiday-message';
import OfficialDetails from '../official-details/official-details';
import UploadForm from '../upload-form/upload-form';
import UploadDetails from '../upload-details/upload-details';
import ManualForm from '../manual-form/manual-form';
import useHolidayPage from '../../hooks/use-holiday-page';
import useHolidayStore from '../../store/use-widget-store';
import { HolidayPage } from '../../utils/constants';

const App = () => {
  const { currentPage } = useHolidayPage();
  const message = useHolidayStore((state) => state.message);
  const setMessage = useHolidayStore((state) => state.setMessage);
  const isUploadDetails = currentPage === HolidayPage.UPLOAD_DETAILS;

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
      {currentPage === HolidayPage.DETAILS && <OfficialDetails />}
      {currentPage === HolidayPage.MANUAL && <ManualForm />}
      {/* The upload form stays mounted (hidden) on the details page so its state survives the round trip */}
      {(currentPage === HolidayPage.UPLOAD || isUploadDetails) && (
        <div hidden={isUploadDetails}>
          <UploadForm />
        </div>
      )}
      {isUploadDetails && <UploadDetails />}
    </>
  );
};

export default App;
