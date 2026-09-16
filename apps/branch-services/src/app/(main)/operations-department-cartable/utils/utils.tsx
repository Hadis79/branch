import { DateRangeID } from '../../batch-ach-history/utils/consts';
import { getLastDays, getLastMonth, getLastWeek, getTodayDate } from '@branch-services/utils';
import { TFunction } from 'i18next';
import { SelectProps } from '@branch-services/ui-kit';

export const getDateRangeById = (value: DateRangeID) => {
  const toDate = getTodayDate();
  switch (value) {
    case DateRangeID.CURRENT:
      return { fromDate: getTodayDate(), toDate };
    case DateRangeID.LAST24H:
      return { fromDate: getLastDays(1), toDate };
    case DateRangeID.LAST3D:
      return { fromDate: getLastDays(3), toDate };
    case DateRangeID.LAST7D:
      return { fromDate: getLastWeek(), toDate };
    case DateRangeID.LAST1M:
    case DateRangeID.CUSTOM:
      return { fromDate: getLastMonth(), toDate };
    default:
      return { fromDate: '', toDate: '' };
  }
};

export const getDateRangeOptions = (t: TFunction): SelectProps['options'] => [
  { value: DateRangeID.CURRENT, label: t('common.current_day') },
  { value: DateRangeID.LAST24H, label: t('common.date24hAgo') },
  { value: DateRangeID.LAST3D, label: t('common.date3dAgo') },
  { value: DateRangeID.LAST7D, label: t('common.date7dAgo') },
  { value: DateRangeID.LAST1M, label: t('common.date1mAgo') },
  { value: DateRangeID.CUSTOM, label: t('common.select_date_range') },
];
