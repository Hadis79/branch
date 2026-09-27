import PageContent from './page-content';
import HolidayMessage from '../holiday-message/holiday-message';
import useHolidayMessage from '../../hooks/use-holiday-message';
import useHolidayPage from '../../hooks/use-holiday-page';
import useHolidayStore from '../../store/use-widget-store';
import { HolidayPage } from '../../utils/constants';

const App = () => {
  const { currentPage } = useHolidayPage();
  const formOrigin = useHolidayStore((state) => state.formOrigin);
  const { message, clearMessage } = useHolidayMessage(currentPage);
  const isUploadDetails = currentPage === HolidayPage.UPLOAD_DETAILS;

  return (
    <>
      {message && !isUploadDetails && (
        <HolidayMessage message={message} closable shouldScroll margin='2.4rem 3.2rem 0' onClose={clearMessage} />
      )}
      <PageContent currentPage={currentPage} formOrigin={formOrigin} />
    </>
  );
};

export default App;
