import { Divider } from 'antd';

import { useTr } from '@branch-services/translation';
import { Button, ColumnsType, Table } from '@branch-services/ui-kit';

import { getHolidayInfoColumns } from '../holidays-table/holiday-info-columns';
import type { NewHoliday } from '../../utils/types';

type EnteredHolidaysTableProps = {
  holidays: NewHoliday[];
  onRemove: (holiday: NewHoliday) => void;
};

// Rows added in the form, not saved yet
const EnteredHolidaysTable = ({ holidays, onRemove }: EnteredHolidaysTableProps) => {
  const [t] = useTr();

  const columns: ColumnsType<NewHoliday> = [
    { title: '#', key: 'row', align: 'center', width: 70, render: (_value, _record, index) => index + 1 },
    ...getHolidayInfoColumns<NewHoliday>(t),
    {
      title: t('actions'),
      key: 'actions',
      align: 'center',
      width: 120,
      render: (_value, holiday) => (
        <Button danger type='link' onClick={() => onRemove(holiday)}>
          {t('delete')}
          <i className='ri-delete-bin-line' />
        </Button>
      ),
    },
  ];

  return (
    <>
      {/* "left" is the start side, so the title sits on the right in RTL */}
      <Divider orientation='left' orientationMargin={0}>
        {t('entered_holidays')}
      </Divider>
      <Table
        dataSource={holidays}
        columns={columns}
        mobileColumns={columns}
        pagination={false}
        hasContainer={false}
        rowKey={({ date, provinceName }: NewHoliday) => `${date}-${provinceName}`}
      />
    </>
  );
};

export default EnteredHolidaysTable;
