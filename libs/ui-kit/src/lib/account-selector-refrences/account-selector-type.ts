export const ACCOUNT_SELECTOR_QUERY_KEY = 'accounts';

export type AccountType = {
  legalId: string;
  accountNumber: string;
  accountType: string;
  accountSubType: string;
  state: string;
  cif: string;
  validCif: boolean;
  branchCode: number;
  accountOpeningDate: string;
  interestRate: number;
  availableBalance: number;
  currentBalance: number;
  usableBalance: number;
  lastTransactionDate: string;
  iban: string;
  companyName: string;
  lastName: string;
  customerType: string;
  accountClosingDate: string;
  pilgrimageType: number;
  forPilgrimage: boolean;
};

export type AccountSelectorType = {
  label: string;
  value: string;
  branchCode: number;
  availableBalance: number;
  companyName?: string;
};
