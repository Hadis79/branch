import { SelectProps } from '@branch-services/ui-kit';
import { Statuses, TransactionType } from './enums';
import { TFunction } from 'i18next';

export const FORM_ITEM_NAMES = {
  accountNumber: 'accountNumber',
  requestStatus: 'requestStatus',
  fromDate: 'fromDate',
  toDate: 'toDate',
  fromAmount: 'fromAmount',
  toAmount: 'toAmount',
  paymentType: 'paymentType',
  traceCode: 'traceCode',
  count: 'count',
  ssn: 'ssn',
  purpose: 'purpose',
  requestType: 'requestType',
};

export const USER_FILE_DETAILS_FORM_ITEM_NAMES = {
  destAccNameOrNumber: 'destAccNameOrNumber',
  status: 'status',
};

export const mainInputNames = [FORM_ITEM_NAMES.traceCode];

export const getTransactionTypeOptions = (t: TFunction): SelectProps['options'] => [
  { value: TransactionType.ALL, label: t('common.all') },
  { value: TransactionType.AUTO, label: t('auto') },
  { value: TransactionType.LOCAL, label: t('local') },
  { value: TransactionType.PAYA, label: t('paya') },
  { value: TransactionType.SATNA, label: t('satna') },
];
export const getStatusClassName = (status: Statuses) => {
  let className: string;
  switch (status) {
    case Statuses.PARTIALLY_SUCCESS:
    case Statuses.WRITTEN_TO_MQ:
    case Statuses.SUCCEED:
    case Statuses.SUCCESS:
    case Statuses.VALIDATION_SUCCESS:
      className = 'status__success';
      break;
    case Statuses.CREATED:
    case Statuses.IN_OPERATION:
    case Statuses.CONFIRMED:
    case Statuses.PAID:
    case Statuses.DETAILS_INSERTED:
    case Statuses.INITIATED:
      className = 'status__created';
      break;
    case Statuses.DENIED:
    case Statuses.FAIL:
    case Statuses.REVERT_FAILED:
    case Statuses.CANCELED:
    case Statuses.FILE_ERROR:
    case Statuses.FAILURE:
    case Statuses.VALIDATION_FAILURE:
      className = 'status__error';
      break;
    case Statuses.IN_PROGRESS:
    case Statuses.PROCESSING:
    case Statuses.PENDING:
    case Statuses.CONFLICT_RECORDS:
    case Statuses.REVERTED:
    case Statuses.ACTIVE:
      className = 'status__warning';
      break;
    case Statuses.SUBMITTED:
    case Statuses.NONE:
    case Statuses.INACTIVE:
      className = 'status__failed';
      break;
    default:
      className = 'status__other';
      break;
  }
  return className;
};
