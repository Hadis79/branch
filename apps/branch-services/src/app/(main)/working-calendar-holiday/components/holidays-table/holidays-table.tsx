import { ReactNode } from 'react';

import { useTr } from '@branch-services/translation';
import { Box, ColumnsType, Table, Text } from '@branch-services/ui-kit';

import { getHolidayInfoColumns } from './holiday-info-columns';
import type { NewHoliday } from '../../utils/types';

type HolidaysTableProps = {
  title: ReactNode;
  holidays: NewHoliday[];
};

// Holidays of one file (a few dozen rows), so the whole list is shown without pagination
const HolidaysTable = ({ title, holidays }: HolidaysTableProps) => {
  const [t] = useTr();

  const columns: ColumnsType<NewHoliday> = [
    { title: '#', key: 'row', align: 'center', width: 70, render: (_value, _record, index) => index + 1 },
    ...getHolidayInfoColumns<NewHoliday>(t),
  ];

  return (
    <Box flexDirection='column' gap='1.6rem' paddingTop='2.4rem'>
      <Box padding='0 3.2rem' fillChildren={false}>
        <Text fontWeight={500}>{title}</Text>
      </Box>
      <Table
        dataSource={holidays}
        columns={columns}
        mobileColumns={columns}
        pagination={false}
        hasContainer={false}
        rowKey={({ date, provinceName }: NewHoliday) => `${date}-${provinceName}`}
      />
    </Box>
  );
};

export default HolidaysTable;
