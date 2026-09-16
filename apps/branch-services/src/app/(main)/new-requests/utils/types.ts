export interface DepositRequestBody {
  id: string | null;
  title: string;
  totalAmount: number;
  totalRecords: number;
  accountNumber: string;
  description: string;
  paymentType: 'LOCAL' | 'PAYA' | 'SATNA' | 'AUTO';
  statementCode: string;
  purpose: string;
  wageAmount: number;
  wageDiscount: number;
  wageOriginalAmount: number;
  duplicateRecordCount: number;
  accountBranchCode: string;
  branchCode: number;
  withdrawalId: string;
  paymentId: string;
  withWithdraw: boolean;
}

export type IntraBankServiceType = 'OFFLINE_SALARY_PAYMENT' | 'OFFLINE_INSTALLMENT_PAYMENT' | 'NONE';

export interface IntraBankRequestDetailsResponse {
  serviceType?: IntraBankServiceType;
  serviceTypeTitle?: string;
}
