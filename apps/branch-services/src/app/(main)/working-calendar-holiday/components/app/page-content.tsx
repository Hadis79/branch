import CreatePage from '../create-page/create-page';
import HolidayList from '../holiday-list/holiday-list';
import UploadDetails from '../upload-details/upload-details';
import { HolidayPage } from '../../utils/constants';

type PageContentProps = {
  currentPage: HolidayPage;
};

const PageContent = ({ currentPage }: PageContentProps) => {
  const isUploadDetails = currentPage === HolidayPage.UPLOAD_DETAILS;

  return (
    <>
      {currentPage === HolidayPage.LIST && <HolidayList />}
      {isUploadDetails && <UploadDetails />}

      {/* Kept mounted while its details page is open, so the uploaded file survives the round trip */}
      {(currentPage === HolidayPage.CREATE || isUploadDetails) && (
        <div hidden={isUploadDetails}>
          <CreatePage />
        </div>
      )}
    </>
  );
};

export default PageContent;
