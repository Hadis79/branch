import useHolidaysQuery from '../queries/use-holidays-query';
import useHolidayStore from '../store/use-widget-store';

// Nothing added yet, as opposed to a search that matches nothing
const useEmptyHolidayList = () => {
  const hasFilter = useHolidayStore((state) => Object.values(state.filter).some(Boolean));
  const { data, isSuccess, isFetching } = useHolidaysQuery();

  return !hasFilter && isSuccess && !isFetching && data.length === 0;
};

export default useEmptyHolidayList;
