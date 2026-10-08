import { Box } from '@branch-services/ui-kit';
import { ApiUtil } from '@branch-services/utils';

import HolidayFilter from './filter/holiday-filter';
import HolidayTable from './data-table/holiday-table';
import HolidayEmptyState from './empty-state/holiday-empty-state';
import HolidayMessage from '../holiday-message/holiday-message';
import useEmptyHolidayList from '../../hooks/use-empty-holiday-list';
import useHolidaysQuery from '../../queries/use-holidays-query';

const HolidayList = () => {
  const { error } = useHolidaysQuery();
  const isEmptyList = useEmptyHolidayList();

  if (isEmptyList) return <HolidayEmptyState />;

  return (
    <>
      {error && (
        <Box padding='2.4rem 3.2rem 0'>
          <HolidayMessage message={ApiUtil.getErrorMessage(error)} />
        </Box>
      )}
      <HolidayFilter />
      <HolidayTable />
    </>
  );
};

export default HolidayList;
