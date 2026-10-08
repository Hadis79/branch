import { TFunction } from 'i18next';

import { ColumnsType } from '@branch-services/ui-kit';

import { OFFICIAL_STATUS_LABELS, OfficialStatus } from '../../utils/constants';
import type { NewHoliday } from '../../utils/types';
import { formatDate } from '../../utils/utils';

// Columns describing a holiday, shared by the list and the uploaded file's details
export const getHolidayInfoColumns = <T extends NewHoliday>(t: TFunction): ColumnsType<T> => [
  { title: t('date'), dataIndex: 'date', align: 'center', render: (date: string) => formatDate(date) },
  { title: t('weekday'), dataIndex: 'holidayDay', align: 'center' },
  { title: t('title'), dataIndex: 'title', align: 'center' },
  {
    title: t('type'),
    dataIndex: 'officialStatus',
    align: 'center',
    render: (status: OfficialStatus) => t(OFFICIAL_STATUS_LABELS[status]),
  },
  { title: t('region'), dataIndex: 'provinceName', align: 'center' },
];
