import { ReactNode } from 'react';

export type Step = {
  id: number;
  title: string;
  route: string;
};

export type InfoItemType = {
  type: string;
  title: string;
  value?: string | ReactNode;
  line?: boolean;
  subValue?: string;
  displayValue?: boolean;
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
  children: any[];
}

interface Child {
  paymentType: string;
  totalAmount: number;
  totalRecords: number;
  wageAmount: number;
  averageAmount: number;
}

export type AccountInfo = {
  accountNumber: string;
  branchCode: number;
  availableBalance: number;
};

export enum withdrawalTypesEnum {
  ACCOUNT_METHOD = 'ACCOUNT_METHOD',
  CHEQUE_METHOD = 'CHEQUE_METHOD',
}
