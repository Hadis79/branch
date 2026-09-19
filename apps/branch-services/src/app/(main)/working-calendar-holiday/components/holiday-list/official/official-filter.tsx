import { Form } from 'antd';

import { useTr } from '@branch-services/translation';
import { Box, Button, SearchItemsContainer, Select } from '@branch-services/ui-kit';

import useOfficialYearsQuery from '../../../queries/use-official-years-query';
import useHolidayStore from '../../../store/use-widget-store';
import type { OfficialListFilter } from '../../../utils/types';
import { getYearOptions, isSameFilter } from '../../../utils/utils';

const OfficialFilter = () => {
  const [t] = useTr();
  const filter = useHolidayStore((state) => state.officialFilter);
  const page = useHolidayStore((state) => state.officialPagination.page);
  const setFilter = useHolidayStore((state) => state.setOfficialFilter);
  const { isFetching, refetch } = useOfficialYearsQuery();

  const handleSearch = ({ year }: OfficialListFilter) => {
    const next = { year: year || undefined };
    if (isSameFilter(next, filter) && page === 1) refetch();
    else setFilter(next);
  };

  return (
    <Box padding='2.8rem 3.2rem 4rem' flexDirection='column'>
      <Form layout='vertical' initialValues={filter} onFinish={handleSearch}>
        <SearchItemsContainer>
          <Form.Item name='year' label={t('year')}>
            <Select allowClear options={getYearOptions()} placeholder={t('select_placeholder')} />
          </Form.Item>
          <Box alignItems='center'>
            <Button htmlType='submit' type='primaryOutlined' loading={isFetching}>
              {t('search')}
            </Button>
          </Box>
        </SearchItemsContainer>
      </Form>
    </Box>
  );
};

export default OfficialFilter;
