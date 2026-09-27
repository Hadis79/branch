import type { ComponentType } from 'react';

import EditOfficialForm from '../edit-official-form/edit-official-form';
import HolidayList from '../holiday-list/holiday-list';
import ManualForm from '../manual-form/manual-form';
import OfficialDetails from '../official-details/official-details';
import UploadDetails from '../upload-details/upload-details';
import UploadForm from '../upload-form/upload-form';
import { HolidayPage } from '../../utils/constants';

type PageContentProps = {
  currentPage: HolidayPage;
  formOrigin: HolidayPage | null;
};

const PAGE_COMPONENTS: Partial<Record<HolidayPage, ComponentType>> = {
  [HolidayPage.LIST]: HolidayList,
  [HolidayPage.MANUAL]: ManualForm,
  [HolidayPage.DETAILS]: OfficialDetails,
  [HolidayPage.UPLOAD_DETAILS]: UploadDetails,
};

const PageContent = ({ currentPage, formOrigin }: PageContentProps) => {
  const CurrentPage = PAGE_COMPONENTS[currentPage];
  const isUploadDetails = currentPage === HolidayPage.UPLOAD_DETAILS;
  const isOfficialDetails = currentPage === HolidayPage.DETAILS;
  const isDetailsPage = isUploadDetails || isOfficialDetails;
  const isFromEdit = isDetailsPage && formOrigin === HolidayPage.EDIT;
  const shouldKeepUploadForm = currentPage === HolidayPage.UPLOAD || (isUploadDetails && !isFromEdit);
  const shouldKeepEditForm = currentPage === HolidayPage.EDIT || isFromEdit;

  return (
    <>
      {CurrentPage && <CurrentPage />}

      {/* Keep the source form mounted while its details page is open, so its state survives the round trip. */}
      {shouldKeepUploadForm && (
        <div hidden={isUploadDetails}>
          <UploadForm />
        </div>
      )}
      {shouldKeepEditForm && (
        <div hidden={isDetailsPage}>
          <EditOfficialForm />
        </div>
      )}
    </>
  );
};

export default PageContent;
