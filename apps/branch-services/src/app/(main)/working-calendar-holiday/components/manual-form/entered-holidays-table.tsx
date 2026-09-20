import { Divider } from 'antd';

import { useTr } from '@branch-services/translation';
import { Button, ColumnsType, Table } from '@branch-services/ui-kit';

import type { EnteredHoliday } from './holiday-entry-form';
import { formatDateWithWeekday } from '../../utils/utils';

type EnteredHolidaysTableProps = {
  holidays: EnteredHoliday[];
  onRemove: (holiday: EnteredHoliday) => void;
};

// Rows added in the form, not saved yet
const EnteredHolidaysTable = ({ holidays, onRemove }: EnteredHolidaysTableProps) => {
  const [t] = useTr();

  const columns: ColumnsType<EnteredHoliday> = [
    { title: '#', key: 'row', align: 'center', width: 70, render: (_value, _record, index) => index + 1 },
    { title: t('title'), dataIndex: 'title', align: 'center' },
    { title: t('region'), dataIndex: 'regionName', align: 'center' },
    { title: t('date'), dataIndex: 'date', align: 'center', render: (date: string) => formatDateWithWeekday(date) },
    {
      title: t('actions'),
      key: 'actions',
      align: 'center',
      width: 120,
      render: (_value, holiday) => (
        <Button danger type='table' onClick={() => onRemove(holiday)}>
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
        rowKey={({ date, regionCode }: EnteredHoliday) => `${date}-${regionCode}`}
      />
    </>
  );
};

export default EnteredHolidaysTable;
