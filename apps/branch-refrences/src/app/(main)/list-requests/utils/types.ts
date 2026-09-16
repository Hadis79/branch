import { Dayjs } from '@branch-services/utils';
import { Statuses } from './consts';

export interface RowDataTableType {
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
  totalDuplicateRecords?: number;
  successCount?: number;
  unspecifiedCount?: number;
  title?: string;
  requestTracingCode: string;
  creatorFullName?: string;
  wageAmount?: number;
  statementTitle?: string;
  totalRecords?: string;
  requestStatusTitle?: string;
  accountBranchCode: string;
  branchCode: string;
  withdrawalId: string;
  paymentId: string;
  withWithdraw: boolean;
  purpose: string;
  branchName: string;
  totalWageAmount: string;
  userSSN: string;
  traceCode: string;
  hasIbanInquiry: boolean;
  requestId: string;
  clientSSN: string;
  id: number;
  status: Statuses;
  averageIbanInquiries: number;
  purposeTitle: string;
  requestType: string;
  shahabCode: string | number;
  inputFileName: string;
}

export interface TransactionKeys {
  id?: string;
  ssn?: string;
  requestType: string;
}

export interface FilterParams {
  accountNumber: string;
  ssn: string;
  traceCode: string;
  deposit_id: string;
  fromAmount: number;
  toAmount: number;
  requestStatus: string;
  paymentType: string;
  description: string;
  fromDate: string | Dayjs;
  toDate: string | Dayjs;
  requestType: string;
  depositType: string;
}

export interface RequestStatus {
  persianTitle: string;
  code: string;
}
