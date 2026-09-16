export const enum TransactionType {
  ALL = 'ALL',
  PAYA = 'PAYA',
  SATNA = 'SATNA',
  LOCAL = 'LOCAL',
  AUTO = 'AUTO',
  NONE = 'NONE',
}

export const enum BatchAchHistoryQueryKeys {
  BATCH_ACH_HISTORY_DATA_TABLE = 'batch-ach-history-data-table',
  BATCH_ACH_HISTORY_DOWNLOAD_REQUEST_FILE = 'batch-ach-history-download-request-file',
  BATCH_ACH_HISTORY_DOWNLOAD_EXPORT_FILE = 'batch-ach-history-download-export-file',
  BATCH_ACH_HISTORY_DOWNLOAD_RECEIPT = 'batch-ach-history-download-receipt',
  BATCH_ACH_HISTORY_PAYMENT_STATUS = 'batch-ach-history-payment-status',
  DOWNLOAD_OFFLINE_FILE_REQUEST = 'download_offline_file_request',
}

export const getBatchAchHistoryQueryKey = (filter: unknown, pagination: unknown) => [
  BatchAchHistoryQueryKeys.BATCH_ACH_HISTORY_DATA_TABLE,
  filter,
  pagination,
];

export const enum Statuses {
  CONFIRMED = 'CONFIRMED',
  FINALIZED = 'FINALIZED',
  CREATED = 'CREATED',
  DENIED = 'DENIED',
  WAIT_TO_CONFIRM_OPERATION = 'WAIT_TO_CONFIRM_OPERATION',
  PARTIALLY_SUCCESS = 'PARTIALLY_SUCCESS',
  INITIATED = 'INITIATED',
  IN_PROGRESS = 'IN_PROGRESS',
  DETAILS_INSERTED = 'DETAILS_INSERTED',
  FILE_ERROR = 'FILE_ERROR',
  SUBMITTED = 'SUBMITTED',
  CANCELED = 'CANCELED',
  PROCESSING = 'PROCESSING',
  PENDING = 'PENDING',
  PAID = 'PAID',
  WRITTEN_TO_MQ = 'WRITTEN_TO_MQ',
  SUCCEED = 'SUCCEED',
  FAIL = 'FAIL',
  FAILED = 'FAILED',
  CONFLICT_RECORDS = 'CONFLICT_RECORDS',
  IN_OPERATION = 'IN_OPERATION',
  REVERTED = 'REVERTED',
  REVERT_FAILED = 'REVERT_FAILED',
  NONE = 'NONE',
  INACTIVE = 'INACTIVE',
}

export const enum DateRangeID {
  CURRENT = 'CURRENT',
  LAST24H = 'LAST24H',
  LAST3D = 'LAST3D',
  LAST7D = 'LAST7D',
  LAST1M = 'LAST1M',
  CUSTOM = 'CUSTOM',
}
export const enum RequestTypes {
  ONLINE = 'ONLINE',
  OFFLINE_ACH = 'OFFLINE_ACH',
  OFFLINE_SALARY = 'OFFLINE_SALARY',
}
