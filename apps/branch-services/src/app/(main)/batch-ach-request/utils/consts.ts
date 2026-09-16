export const enum RequestStatus {
  DEFAULT = 'DEFAULT',
  TRY_AGAIN = 'TRY_AGAIN',
  SUCCESS = 'SUCCESS',
}

export const enum PaymentType {
  LOCAL = 'LOCAL',
  AUTO = 'AUTO',
  SATNA = 'SATNA',
  PAYA = 'PAYA',
  NONE = 'NONE',
}

export const enum PurposesPaymentType {
  LOCAL = 'LOCAL',
  INTRA_BANK = 'INTRA_BANK',
}

export const paymentTypesInfo = [
  { value: PaymentType.LOCAL, content: 'melli_amount', time: 'melli_time' },
  { value: PaymentType.PAYA, content: 'paya_amount', time: 'paya_time' },
  { value: PaymentType.SATNA, content: 'satna_amount', time: 'satna_time' },
];

export const enum TemplateTypes {
  EXCEL_XLS = 'EXCEL_XLS',
  EXCEL_XLSX = 'EXCEL_XLSX',
  TSV = 'TSV',
  CSV = 'CSV',
  TXT = 'TXT',
  CCTI_XML = 'CCTI_XML',
}

export const enum PageRoute {
  SUBMIT = 'submit',
  UPLOAD_FILE = 'upload-file',
  FINAL_CONFIRMATION = 'final-confirmation',
  FILE_DETAILS = 'file-details',
}

export enum BatchAchRequestQueryKeys {
  PAYMENT_ID = 'payment_id',
}

export const REQUEST_LIST_LINK = '/batch-ach-history';

export const FILE_DETAILS_PAGE_URL = '/batch-ach-request/file-details';
