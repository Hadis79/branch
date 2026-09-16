export type ModalProps =
  | {
      dataType: DataType.TRANSACTION_KEYS;
      title: string;
      open: boolean;
      footer?: any;
      ssn?: string;
      id?: string;
      fnc?: any;
    }
  | {
      dataType: DataType.FULL_DATA;
      title: string;
      open: boolean;
      footer?: any;
      fullData: UploadResponse | any;
      fnc?: any;
    };

export enum DataType {
  TRANSACTION_KEYS = 'transaction_keys',
  FULL_DATA = 'full_data',
}

export type groupedDataValue = {
  paymentType: PaymentType;
  averageAmount: number;
  totalAmount: number;
  totalCount: number;
  wageAmount: number;
  totalRecords: number;
};

export interface UploadResponse {
  id: string;
  totalAmount: number;
  totalRecords: number;
  addedRecords: number;
  totalErrorCount: number;
  averageAmount: number;
  wageAmount: number;
  wageOriginalAmount: number;
  wageDiscount: number;
  sourceAccountNumber: string;
  success: boolean;
  duplicateRecordCount: number;
  fileName: string;
  paymentType: string;
  children: Child[];
  hasSimilarRequest: boolean;
  similarRequest: SimilarRequest;
}

export interface SimilarRequest {
  requestId: null;
  trackingCode: null;
  title: null;
  dateTime: null;
  inputFileName: null;
  accountNumber: null;
  totalAmount: number;
  totalRecords: number;
  totalDuplicateRecords: number;
  requestStatus: null;
  requestStatusTitle: string;
  description: null;
  wageAmount: number;
  paymentType: null;
  addedRecords: number;
  errorMessage: null;
  payTime: null;
  finished: boolean;
  successCount: number;
  failCount: number;
  unknownCount: number;
  paymentStatus: string;
  paymentStatusTitle: string;
  children: Child[];
}

interface Child {
  paymentType: string;
  totalAmount: number;
  totalRecords: number;
  wageAmount: number;
  averageAmount: number;
}

export enum PaymentType {
  PAYA = 'پایا',
  SATNA = 'ساتنا',
  LOCAL = 'ملی به ملی',
  AUTO = 'خودکار',
}

export type TransactionKeys = {
  id?: string;
  ssn?: string;
};
