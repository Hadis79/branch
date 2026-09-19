import HolidaysTable from '../holidays-table/holidays-table';
import useHolidayStore from '../../store/use-widget-store';

// Rows of the uploaded file, opened from the upload form
const UploadDetails = () => {
  const holidays = useHolidayStore((state) => state.uploadedHolidays);

  return <HolidaysTable holidays={holidays} />;
};

export default UploadDetails;
