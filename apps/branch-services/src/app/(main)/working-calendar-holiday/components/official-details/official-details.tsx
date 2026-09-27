import { useTr } from '@branch-services/translation';
import { ApiUtil } from '@branch-services/utils';

import HolidaysTable from '../holidays-table/holidays-table';
import HolidayMessage from '../holiday-message/holiday-message';
import useHolidayPage from '../../hooks/use-holiday-page';
import useDownloadFileMutation from '../../queries/use-download-file-mutation';
import useOfficialHolidaysQuery from '../../queries/use-official-holidays-query';

// Holidays of the year picked in the official list (`?year=` in the URL)
const OfficialDetails = () => {
  const { year } = useHolidayPage();
  const { data = [], error, isFetching } = useOfficialHolidaysQuery(year);
  return (
    <>
      {error && <HolidayMessage message={ApiUtil.getErrorMessage(error)} margin='2.4rem 3.2rem 0' />}
      <HolidaysTable holidays={data} loading={isFetching} />
    </>
  );
};

export default OfficialDetails;
