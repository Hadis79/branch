import { FormInstance } from 'antd/es/form/hooks/useForm';
import { Obj } from '@branch-services/types';
import { DateRangeID, Statuses } from './consts';
import { TFunction } from 'i18next';
import { SelectProps } from '@branch-services/ui-kit';
import { getLastDays, getLastMonth, getLastWeek, getTodayDate } from '@branch-services/utils';

export function resetFormExcept(form: FormInstance<any>, formItems: Obj, inputsNames: string[]) {
  const allNames = Object.keys(formItems);
  const namesToReset = allNames.filter((name) => !inputsNames.includes(name));
  form.resetFields(namesToReset);
}

export const getStatusClassName = (status: Statuses) => {
  let className: string;
  switch (status) {
    case Statuses.PARTIALLY_SUCCESS:
    case Statuses.WRITTEN_TO_MQ:
    case Statuses.SUCCEED:
      className = 'status__success';
      break;
    case Statuses.IN_OPERATION:
    case Statuses.CONFIRMED:
    case Statuses.PAID:
    case Statuses.DETAILS_INSERTED:
    case Statuses.FINALIZED:
      className = 'status__created';
      break;
    case Statuses.DENIED:
    case Statuses.FAIL:
    case Statuses.FAILED:
    case Statuses.REVERT_FAILED:
    case Statuses.CANCELED:
    case Statuses.FILE_ERROR:
    case Statuses.INACTIVE:
      className = 'status__error';
      break;
    case Statuses.IN_PROGRESS:
    case Statuses.PROCESSING:
    case Statuses.PENDING:
    case Statuses.CONFLICT_RECORDS:
    case Statuses.REVERTED:
    case Statuses.CREATED:
    case Statuses.WAIT_TO_CONFIRM_OPERATION:
      className = 'status__warning';
      break;
    case Statuses.INITIATED:
    case Statuses.SUBMITTED:
    case Statuses.NONE:
      className = 'status__failed';
      break;
    default:
      className = 'status__other';
      break;
  }
  return className;
};

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
