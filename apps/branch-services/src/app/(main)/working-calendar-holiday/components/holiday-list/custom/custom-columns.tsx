import { Tooltip } from 'antd';
import { TFunction } from 'i18next';

import { Button, ColumnsType } from '@branch-services/ui-kit';

import type { CustomHoliday, PageParams } from '../../../utils/types';
import { calculateRow, formatDate, isPastDate } from '../../../utils/utils';

type ColumnsParams = {
  t: TFunction;
  pagination: PageParams;
  onDelete: (holiday: CustomHoliday) => void;
};

export const getCustomColumns = ({ t, pagination, onDelete }: ColumnsParams): ColumnsType<CustomHoliday> => [
  {
    title: '#',
    key: 'row',
    align: 'center',
    width: 70,
    render: (_value, _record, index) => calculateRow(index, pagination.page, pagination.size),
  },
  { title: t('date'), dataIndex: 'date', align: 'center', render: (date: string) => formatDate(date) },
  { title: t('weekday'), dataIndex: 'holidayDay', align: 'center' },
  { title: t('title'), dataIndex: 'title', align: 'center' },
  { title: t('region'), key: 'province', align: 'center', render: (_value, { province }) => province.provinceName },
  {
    title: t('actions'),
    key: 'actions',
    align: 'center',
    width: 120,
    render: (_value, holiday) => {
      const isPast = isPastDate(holiday.date);

      // A disabled button fires no mouse events, so the tooltip needs a wrapper
      return (
        <Tooltip title={isPast ? t('past_holiday_hint') : undefined}>
          <span>
            <Button danger type='table' disabled={isPast} onClick={() => onDelete(holiday)}>
              {t('delete')}
              <i className='ri-delete-bin-line' />
            </Button>
          </span>
        </Tooltip>
      );
    },
  },
];
