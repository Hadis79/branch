export const enum FileDetailsQueryKeys {
  FileDetails = 'file-details',
  FileFilterDetails = 'file-filters',
}

export const enum TransactionModalDetailsQueryKeys {
  TRANSACTION_MODAL_DETAILS = 'transaction-modal-details',
}

export const enum BillPaymentStatus {
  INSERTED = 'INSERTED',
  INITIATED = 'INITIATED',
  CREATED = 'CREATED',
  PENDING = 'PENDING',
  PAID = 'PAID',
  ISC_FAILED = 'ISC_FAILED',
  CORE_FAILED = 'CORE_FAILED',
  WRITTEN_TO_MQ = 'WRITTEN_TO_MQ',
  SUCCESS = 'SUCCESS',
  REVERT_REQUIRED = 'REVERT_REQUIRED',
  REVERT = 'REVERT',
  REVERTED = 'REVERTED',
  REVERT_FAILED = 'REVERT_FAILED',
  TIMED_OUT = 'TIMED_OUT',
  PROCESSING = 'PROCESSING',
  CANCEL24 = 'CANCEL24',
  R_CANCEL24 = 'R_CANCEL24',
  NONE = 'NONE',
}

export const enum ListRequestQueryKeys {
  LIST_REQUEST_HISTORY_DATA_TABLE = 'list-request-history-data-table',
  LIST_REQUEST_HISTORY_DOWNLOAD_REQUEST_FILE = 'list-request-history-download-request-file',
  LIST_REQUEST_HISTORY_DOWNLOAD_EXPORT_FILE = 'list-request-history-download-export-file',
  LIST_REQUEST_HISTORY_DOWNLOAD_RECEIPT = 'list-request-history-download-receipt',
  LIST_REQUEST_HISTORY_PAYMENT_STATUS = 'list-request-history-payment-status',
}

export interface RequestStatus {
  persianTitle: string;
  code: string;
}
