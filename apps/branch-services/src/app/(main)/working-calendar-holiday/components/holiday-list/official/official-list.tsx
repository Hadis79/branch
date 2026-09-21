import { useTr } from '@branch-services/translation';
import { Table } from '@branch-services/ui-kit';
import { ApiUtil } from '@branch-services/utils';

import OfficialFilter from './official-filter';
import { getOfficialColumns } from './official-columns';
import HolidayMessage from '../../holiday-message/holiday-message';
import useHolidayPage from '../../../hooks/use-holiday-page';
import useOfficialYearsQuery from '../../../queries/use-official-years-query';
import useHolidayStore from '../../../store/use-widget-store';
import { HolidayPage } from '../../../utils/constants';

const OfficialList = () => {
  const [t] = useTr();
  const { navigateTo } = useHolidayPage();
  const pagination = useHolidayStore((state) => state.officialPagination);
  const { data, error, isFetching } = useOfficialYearsQuery();

  const columns = getOfficialColumns({
    t,
    pagination,
    onShowDetails: (year) => navigateTo(HolidayPage.DETAILS, { year }),
  });

  return (
    <>
      {error && <HolidayMessage message={ApiUtil.getErrorMessage(error)} margin='2.4rem 3.2rem 0' />}
      <OfficialFilter />
      <Table
        loading={isFetching}
        dataSource={data ?? []}
        columns={columns}
        mobileColumns={columns}
        // onChange={(config) => setPagination(nextPagination(config, pagination.size))}
        hasContainer={false}
        pagination={false}
        rowKey='id'
      />
    </>
  );
};

export default OfficialList;
