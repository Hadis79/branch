import { useTr } from '@branch-services/translation';
import { Button } from '@branch-services/ui-kit';
import { ApiUtil } from '@branch-services/utils';

import HolidaysTable from '../holidays-table/holidays-table';
import HolidayMessage from '../holiday-message/holiday-message';
import useHolidayPage from '../../hooks/use-holiday-page';
import useDownloadFileMutation from '../../queries/use-download-file-mutation';
import useOfficialHolidaysQuery from '../../queries/use-official-holidays-query';
import { Api } from '../../services';

// Holidays of the year picked in the official list (`?year=` in the URL)
const OfficialDetails = () => {
  const [t] = useTr();
  const { year } = useHolidayPage();
  const { data = [], error, isFetching } = useOfficialHolidaysQuery(year);
  const download = useDownloadFileMutation();

  const downloadButton = year && (
    <Button
      type='primaryOutlined'
      icon={<i className='ri-download-2-line' />}
      loading={download.isPending}
      onClick={() => download.mutate(() => Api.downloadOfficialHolidays(year))}
    >
      {t('download_file')}
    </Button>
  );

  return (
    <>
      {error && <HolidayMessage message={ApiUtil.getErrorMessage(error)} margin='2.4rem 3.2rem 0' />}
      <HolidaysTable holidays={data} loading={isFetching} extra={downloadButton} />
    </>
  );
};

export default OfficialDetails;
