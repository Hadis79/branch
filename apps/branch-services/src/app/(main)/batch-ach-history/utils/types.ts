import { RequestTypes } from './consts';

export interface RowDataTableType {
  errorMessage?: string;
  createdOn?: string;
  accountNumber?: string;
  paymentType: string;
  requestStatus?: string;
  paymentTypeTitle?: string;
  totalAmount?: number;
  description?: string;
  accountOwnerName?: string;
  accountOwnerSsn: string;
  approverName?: string;
  approverSsn?: string;
  statementCode?: string;
  depositCount?: number;
  duplicateRecordCount?: number;
  successCount?: number;
  failedCount?: number;
  unspecifiedCount?: number;
  title?: string;
  requestTracingCode: string;
  creatorFullName?: string;
  inputFileName: string;
  wageAmount?: number;
  statementTitle?: string;
  totalCount?: string;
  requestStatusTitle?: string;
  accountBranchCode: string;
  branchCode: string;
  withdrawalId: string;
  paymentId: string;
  withWithdraw: boolean;
  hasIbanInquiry: boolean;
  depositId: string;
  averageIbanInquiries: number;
  depositMade: boolean;
  branchName: string;
  validatorFullName: string;
  requestType: RequestTypes;
}

export interface TransactionKeys {
  id?: string;
  ssn?: string;
}

export interface FilterParams {
  accountNumber: string;
  ssn: string;
  fromDate: string;
  toDate: string;
  fromAmount: number;
  toAmount: number;
  requestStatus: string;
  paymentType: string;
  description: string;
  traceCode?: string;
  purpose?: string;
  requestType?: RequestTypes;
}

export interface RequestStatus {
  title: string;
  value: string;
}
