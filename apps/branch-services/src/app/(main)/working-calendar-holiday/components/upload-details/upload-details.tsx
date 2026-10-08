import { useTr } from '@branch-services/translation';

import HolidaysTable from '../holidays-table/holidays-table';
import useHolidayStore from '../../store/use-widget-store';
import { formatCount, withoutExtension } from '../../utils/utils';

// Rows of the uploaded file, opened from the upload form
const UploadDetails = () => {
  const [t] = useTr();
  const file = useHolidayStore((state) => state.uploadedFile);

  if (!file) return null;

  // <bdi> keeps the latin file name from reordering the persian text around it
  const title = (
    <>
      <bdi>{withoutExtension(file.fileName)}</bdi>
      {'  •  '}
      {t('day_count_value', { dayCount: formatCount(file.holidays.length) })}
    </>
  );

  return <HolidaysTable title={title} holidays={file.holidays} />;
};

export default UploadDetails;
