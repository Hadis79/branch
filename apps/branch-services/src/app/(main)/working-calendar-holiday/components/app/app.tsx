import PageContent from './page-content';
import HolidayMessage from '../holiday-message/holiday-message';
import useHolidayMessage from '../../hooks/use-holiday-message';
import useHolidayPage from '../../hooks/use-holiday-page';
import useHolidayStore from '../../store/use-widget-store';
import { HolidayPage } from '../../utils/constants';

const App = () => {
  const { currentPage } = useHolidayPage();
  const message = useHolidayStore((state) => state.message);
  const { resetMessage } = useHolidayMessage();
  const isUploadDetails = currentPage === HolidayPage.UPLOAD_DETAILS;

  return (
    <>
      {message && !isUploadDetails && (
        <HolidayMessage message={message} closable shouldScroll margin='2.4rem 3.2rem 0' onClose={resetMessage} />
      )}
      <PageContent currentPage={currentPage} />
    </>
  );
};

export default App;
