import { ReactNode } from 'react';

import { useTr } from '@branch-services/translation';
import { Box, ColumnsType, Table, Text } from '@branch-services/ui-kit';

import type { OfficialHoliday } from '../../utils/types';
import { formatCount, monthName } from '../../utils/utils';

type HolidaysTableProps = {
  holidays: OfficialHoliday[];
  loading?: boolean;
  // Shown next to the title, e.g. a download button
  extra?: ReactNode;
};

// Holidays of one year (about 26 rows), so the whole list is shown without pagination
const HolidaysTable = ({ holidays, loading, extra }: HolidaysTableProps) => {
  const [t] = useTr();

  const columns: ColumnsType<OfficialHoliday> = [
    { title: '#', key: 'row', align: 'center', width: 70, render: (_value, _record, index) => index + 1 },
    { title: t('day'), dataIndex: 'day', align: 'center' },
    { title: t('month'), dataIndex: 'month', align: 'center', render: (month: number) => monthName(month) },
    { title: t('title'), dataIndex: 'title', align: 'center' },
  ];

  return (
    <Box flexDirection='column' gap='1.6rem' padding='3.2rem'>
      <Box justifyContent='space-between' alignItems='center' fillChildren={false}>
        <Text fontWeight={500}>{t('holiday_list_title', { dayCount: formatCount(holidays.length) })}</Text>
        {extra}
      </Box>
      <Table
        loading={loading}
        dataSource={holidays}
        columns={columns}
        mobileColumns={columns}
        pagination={false}
        hasContainer={false}
        rowKey={({ month, day, title }: OfficialHoliday) => `${month}-${day}-${title}`}
      />
    </Box>
  );
};

export default HolidaysTable;
