import { BillPaymentStatus } from './consts';
export const getStatusClassName = (status) => {
  let className;
  switch (status) {
    case BillPaymentStatus.PROCESSING:
    case BillPaymentStatus.PENDING:
    case BillPaymentStatus.REVERT_REQUIRED:
    case BillPaymentStatus.REVERT:
    case BillPaymentStatus.REVERTED:
      className = 'status__warning';
      break;
    case BillPaymentStatus.SUCCESS:
    case BillPaymentStatus.PAID:
    case BillPaymentStatus.WRITTEN_TO_MQ:
      className = 'status__success';
      break;
    case BillPaymentStatus.ISC_FAILED:
    case BillPaymentStatus.CORE_FAILED:
    case BillPaymentStatus.REVERT_FAILED:
    case BillPaymentStatus.TIMED_OUT:
    case BillPaymentStatus.CANCEL24:
    case BillPaymentStatus.R_CANCEL24:
      className = 'status__error';
      break;
    case BillPaymentStatus.INSERTED:
    case BillPaymentStatus.INITIATED:
    case BillPaymentStatus.CREATED:
      className = 'status__info';
      break;
    default:
      className = 'status__other';
      break;
  }
  return className;
};
