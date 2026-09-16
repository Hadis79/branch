export interface DownloadExportFileParams {
  id?: string;
}

export interface HistoryParams {
  accountNumber?: string;
  description?: string;
  fromAmount?: number;
  toAmount?: number;
  paymentType?: string;
  requestStatus?: string;
  ssn?: string;
  fromDate?: string;
  toDate?: string;
  traceCode?: string;
  purpose?: string;
  requestType?: string;
  page?: number;
  size?: number;
}

export interface HistoryPaginationParams {
  count?: number;
  current?: number;
  page: number;
  size: number;
}
